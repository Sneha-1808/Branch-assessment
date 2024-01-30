import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Message } from "@/models/Messages";

import mongoose from "mongoose";

export default async function handle(req, res){
    const {method} = req;
    // res.json(req.method);
    // mongoose.Promise=clientPromise;/
    await mongooseConnect();

    if(method==='GET'){
        
            res.json(await Message.find());
        
    
    }
    res.json(await Message.find().sort({createdAt:-1}));
}