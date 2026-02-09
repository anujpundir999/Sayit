import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user  = session?.user
    console.log("Session in get messages:", session);
    if(!session || !session.user){
        return Response.json({
            success:false,
            message : "Not Authenticated"
        },{
            status:401
        })
    }

     const userId:mongoose.Types.ObjectId = new mongoose.Types.ObjectId(user!._id);
     console.log("User ID:", userId);
    try{
        const user = await UserModel.aggregate([
            {$match :{_id:userId}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group : {_id:'$_id',messages:{$push:'$messages'}}}
        ])
        console.log("User Messages:", user);
        if(!user || user.length === 0){
            return Response.json({
                success:true,
                messages: []
            },{
                status:200
            })
        }
        return Response.json({
                success:true,
                messages : user[0].messages
            },{
                status:200
        })
    }catch(error){
        console.error(error);
        return Response.json({
                success:false,
                message : "Unexpected error"
            },{
                status:500
        })
    }
    
}