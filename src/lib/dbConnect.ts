//Since Next js run on edge we have to write a complete connection for database which we check whether out database is connected or not and according to that it will work.

import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

async function dbConnect():Promise<void> {

    //checking is there already connection made..
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }

    //these connection object contains many thing such as name,host,port,readystate,models
    //the db object contains connnections , models,options,schema and model
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI||'',{})
        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully");
    }catch(error){
        console.log("database connection failed",error);
        process.exit(1);
    }
}

export default dbConnect ;