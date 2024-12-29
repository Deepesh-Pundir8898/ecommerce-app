import mongoose from "mongoose"
import "dotenv/config"

export async function startServer(){
    try {
        await mongoose.connect(process.env.MONOGODBURL)
        console.log("db connected successfull")
    
    } catch (error) {
        console.log("Error connecting to DB",error);
    }
}