import { Response } from "express";

export function JsonResponse(
    res: Response,
    statusCode: number,
    message: string,
    success ?: boolean,
    data?: any,
    pagination ?: any ,
){
    return res.status(statusCode).json({
        success: success === undefined ? true : success,
        message,
        data,
        pagination
    })
}