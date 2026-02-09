import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user  = session?.user

    if(!session || !session.user){
        return Response.json({
            success:false,
            message : "Not Authenticated"
        },{
            status:401
        })
    }
    const userId = user?._id;
    const {acceptMessages} = await request.json();

    try{
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages:acceptMessages},
            {new:true}
        )
        if(!updatedUser){
            return Response.json({
                success:false,
                message:"error while updating the data"
            },{
                status:401
            })
        }
        return Response.json({
                success:true,
                message:"Successfully Updated",
                updatedUser
            },{
                status:200
            })
    }catch{
        return Response.json(
            {
                success:false,
                message:"Failed to update user status to accept messages"
            },
            {
                status:400
            }
        )
    }
}

export async function GET(){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user  = session?.user

    if(!session || !session.user){
        return Response.json({
            success:false,
            message : "Not Authenticated"
        },{
            status:401
        })
    }
    const userId = user?._id;
    try{
        const foundUser = await UserModel.findById(userId);
        if(!foundUser){
            return Response.json({
                success:false,
                message : "No User Found"
            },{
                status:404
            })
        }
        return Response.json({
                success:true,
                message : "User Found",
                isAcceptingMessage: foundUser.isAcceptingMessages
            },{
                status:200
            })
    }catch{
        return Response.json({
                success:false,
                message : "Error in getting message accepting status",
            },{
                status:500
            })
    }
}