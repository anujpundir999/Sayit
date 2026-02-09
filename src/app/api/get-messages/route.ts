import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

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

     const userId:mongoose.Types.ObjectId = new mongoose.Types.ObjectId(user!._id);
    try{
        const user = await UserModel.aggregate([
            {$match :{_id:userId}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group : {_id:'$_id',messages:{$push:'$messages'}}}
        ])
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
    }catch{
        return Response.json({
                success:false,
                message : "Unexpected error"
            },{
                status:500
        })
    }
    
}