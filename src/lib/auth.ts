import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";
import UserModel from "@/model/User";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            credentials:{
                username:{label : "Username",type:"text",placeholder:"Enter Your Username"},
                password:{label:"Password",type:"password",placeholder:"Enter Password"}

            },
            async authorize(credentials: Record<"username" | "password", string>) {
                await dbConnect();
                try{
                    const user = await UserModel.findOne({
                        username:credentials.username
                    })
                    if(!user){
                        throw new Error("No User Found With this username ")
                    }

                    if(!user.isVerified){
                        throw new Error("Please Verify Your account first");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    console.log("Checking If it is correct or not",isPasswordCorrect);
                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error("Please verify your account before login");

                    }
                }catch(err:any){
                    throw new Error(err)
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