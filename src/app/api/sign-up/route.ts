import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(request:NextRequest){
    await dbConnect();

    try{
        const {username,email,password} =await request.json();

        //checks if username exist in database
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })

        //then there is no need of signup because username is already taken
        if(existingUserVerifiedByUsername){
            return Response.json(
            {
                success : false,
                message:"Username is already taken"
            },
            {
                status:400
            }
            )
        }
        const existingUserByEmail = await UserModel.findOne({
            email
        })

        //Making a random 6 digit otp..
        const verifyCode = Math.floor(100000+Math.random()*900000).toString()


        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User already exist with this email"
                },{
                    status:400
                })
            }
            else{
                const hashedPassword = await bcrypt.hash(password,10);
                //user ka password change kr rhe hai..iss time usko verify otp dubara bhejenge
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode =  verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000);
                await existingUserByEmail.save();
                
            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10);
            const expiryDate = new Date();
            expiryDate.setHours (expiryDate.getHours()+1);

            const newUser = new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                messages:[],
            })
            await newUser.save();
            console.log("New user created",newUser);
        }
            //sending verification email

            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            //checks whether the email is sent succesfully or not
            if(!emailResponse.success){
                return Response.json({
                    success:false,
                    message:emailResponse.message
                },{
                    status:500
                })
            }
            console.log(emailResponse);
            return Response.json({
                    success:true,
                    message:"User registered successfully . Please Verify Your email"
                },{
                    status:201
                })
    }catch(error){
        console.error("Error registering user",error)
        return Response.json(
            {
                success:false,
                message:"Error registering user"
            },
            {
                status:500
            }
        )
    }
}
