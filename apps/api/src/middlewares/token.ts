import { IUser } from "@/type/user";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        console.log(`verify token`);
        
        const token = req.header('Authorization')?.replace('Bearer ', "")
        console.log(token);
        
        if(!token) throw "token not found"

        const verifiedToken = verify(token, process.env.SECRET_JWT!)

        req.user = verifiedToken as IUser
        next()

    } catch (err) {
        res.status(400).send({
            status: 'this token is invalid',
            msg: err
        })
    }
}

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        if(req.user?.role !== 'ADMIN') throw "you are not admin"
        next()
    } catch (err) {
        res.status(400).send({
            status: 'yaint admin',
            msg: err
        })
    }
}