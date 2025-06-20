import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request){
    try{
        await dbConnect();
        const {username,code} = await request.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json(
            {
                success:false,
                message:"User Not Found"
            },{
                status:500
            }
            )
        }

        const isCodeValid = user.verifyCode==code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)>new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            return Response.json(
            {
                success:true,
                message:"Account Verified successfully"
            },{
                status:200
            }
        )
        }
        else if (!isCodeNotExpired){
            return Response.json(
            {
                success:false,
                message:"Verification Code has expired"
            },{
                status:400
            }
            )
        }
        else{
            return Response.json(
            {
                success:false,
                message:"Wrong verification code"
            },{
                status:400
            }
            )
        }

    }catch(error){
        console.error("Error verifying user",error);
        return Response.json(
            {
                success:false,
                message:"Error verifying user"
            },{
                status:400
            }
        )
    }
}