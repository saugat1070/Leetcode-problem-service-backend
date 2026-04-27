import express, { NextFunction } from "express";
import { AppError } from "./utils/error/app.error";
import { cpuUsage } from "node:process";
import v1Router from "./Routers/v1";

const app: express.Application = express();

app.use(express.json());


app.get("api/v1/health", (_req, res) => {
  return res.status(200).json({
    message: "API is healthy",
    cpuUsage: cpuUsage(),
    status: "ok",
    timeStamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/v1",v1Router);

app.use((error:AppError,req:express.Request,res:express.Response,next:NextFunction)=>{
    console.log(error);
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
        status: error.name || "error",
        timeStamp: new Date().toISOString()
    })
})

export default app;