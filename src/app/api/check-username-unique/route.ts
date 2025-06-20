import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest } from "next/server";

const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:NextRequest){

    await dbConnect();

    try {
        //it will get username by the query params
        const {searchParams} = new URL (request.url)
        const queryParam = {
            username : searchParams.get('username')
        }

        //validating with zodd
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result);

        //In Zod, .errors does not exist — but .issues and .format() do.
        //The .format() method transforms validation issues into a field-wise structured format,
        // and _errors is a special internal property used within that formatted object.
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors ||[]
            return Response.json(
                {
                    success:false,
                    message : usernameErrors?.length>0
                    ?usernameErrors.join(',')
                    : 'Invalid query parameters',
                },{
                    status:400
                }
            );
        }

        const {username} = result.data
        const existingVerifiedUser = await UserModel.findOne({username,isVerified:true})
        if (existingVerifiedUser){
            return Response.json({
                success: false,
                message:'Username is already taken',
            },{
                status:400
            })
        }
        return Response.json({
                success: true,
                message:'Username is unique',
            },{
                status:200
            })


    }catch(error){
        console.error("error checking username",error)
        return Response.json(
            {
                success : false,
                message:"Error checking username"
            },
            {
                status:500
            }
        )
    }
}