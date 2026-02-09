import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request:Request){
    await dbConnect();

    const {username,content}= await request.json()

    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message : "User Not Found !!"
            },{
                status:404
            })
        }
        if(!user.isAcceptingMessages){
            return Response.json({
                success:false,
                message : "User is not acceppting the messages right now"
            },{
                status:403
            })
        }
        const newMessage = {content,createdAt:new Date()}
        user.messages.push(newMessage as Message);
        await user.save();
        return Response.json({
                success:true,
                message : "Message Sent Successfully"
            },{
                status:200
        })
    }catch{
        return Response.json({
                success:false,
                message : "Error adding messages !!"
            },{
                status:500
        })
    }
}