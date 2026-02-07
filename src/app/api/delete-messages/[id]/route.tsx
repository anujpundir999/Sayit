import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function DELETE(request:Request,{params}:{params:{messageId:string}}){
    const {messageId} = params;
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
    try{
        const updateResult = await UserModel.updateOne(
            {_id:user!._id},
            {$pull:{messages:{_id:messageId}}}
        )
        if(updateResult.modifiedCount===0){
            return Response.json({
                success:false,
                message:"Message Not Found"
            },{
                status:404
            })
        }
            return Response.json({
                success:true,
                message:"Message Deleted Successfully"
            },{
                status:200
            })
    }
    catch(error){
        console.error(error);
        return Response.json({
                success:false,
                message:"Error while deleting Message"
            },{
                status:500
            })
    }
    
}