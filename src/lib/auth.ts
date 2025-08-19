import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";
import UserModel from "@/model/User";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                username:{label : "Username",type:"text",placeholder:"Enter Your Username"},
                password:{label:"Password",type:"password",placeholder:"Enter Password"},
            },
            async authorize(credentials:any):Promise<any> {
                await dbConnect();
                try{
                    if (!credentials) {
                        throw new Error("No credentials provided.");
        }
                    const User = await UserModel.findOne({
                        username: credentials.username
                    })
                    if(!User){
                        throw new Error("Invalid Credentials ")
                    }

                    if(!User.isVerified){
                        throw new Error("Please Verify Your account first");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,User.password)
                    console.log("Checking If it is correct or not",isPasswordCorrect);
                    if(isPasswordCorrect){
                    // Transform Mongoose document to plain object with correct types
                        return User;
                    } else {
                        throw new Error("Invalid Credentials");
                    }
                }catch(error:any){
                    console.error("Authorization Error:", error); // Log the actual error for debugging
                    // NextAuth.js expects a string for the error message that gets propagated to the client.
                    // If you throw a plain Error, its message property will be used.
                    // You can customize the message based on the type of error.
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    } else {
                        // For any unexpected errors, provide a generic message
                        throw new Error("An unknown error occurred during login.");
                    }
                }

            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username
            }
            return token
        },
        async session({session,token}) {
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username
            }
            return session
        },
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET

}