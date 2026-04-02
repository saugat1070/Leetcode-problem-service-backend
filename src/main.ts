import express, { NextFunction } from "express";
import { AppError } from "./utils/error/app.error";
import { cpuUsage } from "node:process";

const app: express.Application = express();

app.get("/health", (_req, res) => {
  return res.status(200).json({
    message: "API is healthy",
    cpuUsage: cpuUsage(),
    status: "ok",
    timeStamp: new Date().toISOString(),
  });
});

app.use((error:AppError,req:express.Request,res:express.Response,next:NextFunction)=>{
    console.log(error);
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
        status: error.name || "error",
        timeStamp: new Date().toISOString()
    })
})

export default app;