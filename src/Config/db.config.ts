import mongoose from "mongoose";
import logger from "./logger.config";
import { Env } from "./env.config";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(Env.dbUrl);
        logger.info("Connected to mongodb successfully");

        mongoose.connection.on("error",(error)=>{
            logger.error("Mongodb connection error",error);
        });

        mongoose.connection.on("disconnect",(error)=>{
            logger.warn("Mongodb disconnected");
        });

        process.on("SIGINT",async ()=>{
            await mongoose.connection.close();
            logger.info("Mongodb connection closed");
            process.exit(0);
        })
    } catch (error) {
        logger.error("Failed to connect mongodb",error);
        process.exit(1);
    }
}