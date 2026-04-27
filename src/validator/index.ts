import logger from "../Config/logger.config";
import { NextFunction,Request,Response } from "express";
import { ZodObject } from "zod";


export const validateRequestBody = (schema: ZodObject) =>{
    return async (req:Request,res:Response, next:NextFunction) => {
        try {
            logger.info("Validating request body");
            await schema.parseAsync(req.body);
            logger.info("Request body validation successful");
            next();
        } catch (error) {
            logger.error("Request body validation failed");
            res.status(400).json({ error: "Invalid request body" });
        }
    }
}

export const validateRequestQuery = (schema: ZodObject) =>{
    return async (req:Request,res:Response, next:NextFunction) => {
        try {
            logger.info("Validating request query");
            await schema.parseAsync(req.query);
            logger.info("Request query validation successful");
            next();
        } catch (error) {
            logger.error("Request query validation failed");
            res.status(400).json({ error: "Invalid request query" });
        }
    }
}