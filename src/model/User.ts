import mongoose,{Schema,Document} from "mongoose";

//declaring types of message
export interface Message extends Document {
    content:string;
    createdAt:Date;
}


//creating Message Schema
const MessageSchema : Schema<Message> = new Schema({
    content: {
        type: String,
        required:true
    },
    createdAt : {
        type:Date,
        required:true,
        default:Date.now
    }
})


export interface User extends Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[];
}

const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required:[true,"Username is required"],
        trim : true,
        unique : true
    },
    email : {
        type:String,
        required:[true,"Email is required"],
        unique : true,
        match:[/.+\@.+\..+/,"Please Use a valid Email Address"]
    },
    password :{
        type:String,
        required:[true,"Password Is Required"]
    },
    verifyCode :{
        type:String,
        required:[true,"Verify Code Is Required"],
    },
    verifyCodeExpiry :{
        type:Date,
        required:[true,"Verify Code Expiry Is Required"]
    },
    isVerified: {
        type:Boolean,
        default:false,
    },
    isAcceptingMessage: {
        type:Boolean,
        default:true,
    },
    messages: [MessageSchema]

})

//next js me edge pe chlta hai to pta nhi hota next js ko ki pehle kbhi chla hai ya nhi to dono conditions dhyan me rkhne hongee..
const UserModel = (mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",UserSchema)

export default UserModel;