import prisma from "@/prisma";
import { Request, Response } from "express";

export class DiscountController {
    async getDiscountType(req:Request, res:Response) {
        try {
            const data = await prisma.discountType.findMany()
            return res.status(200).send({
                status: 'ok',
                msg: 'Get all discount type',
                result:data
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }

    async getDiscountTypeByCode(req:Request, res:Response) {
        try {
            console.log(req.body);
            
            const { code, eventId } = req.body
            const data = await prisma.discountType.findFirst({
                where: {
                    AND: [
                        { code: code },
                        { eventID: eventId }
                    ]
                }
            })
            return res.status(200).send({
                status: 'ok',
                msg: 'Get discount by Code',
                result:data
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }

    async postDiscount(req:Request, res:Response) {
        try {            
            const {
                discountName,
                discountDescription,
                discountCode,
                discountCutType,
                discountCut,
                discountReqQuantity,
                discountReqPrice,
                discountLimit,
                discountDateExpire,
                eventId
            } = req.body

            const existEvent = await prisma.event.findUnique({
                where: {
                    id: +eventId
                }
            })
            if(!existEvent) throw 'Event not valid'

            const existCode = await prisma.discountType.findFirst({
                where: {
                    AND: [
                        {
                            code: discountCode
                        },
                        {
                            eventID: +eventId
                        }
                    ]                    
                }
            })
            if(existCode) throw 'Code already exist'

            const data = await prisma.discountType.create({
                data: {
                    name: discountName,
                    description: discountDescription,
                    code: discountCode,
                    cutType: discountCutType,
                    cut: discountCut,
                    minQuantity: discountReqQuantity,
                    minPrice: discountReqPrice,
                    limit:discountLimit,
                    expiredDate:new Date(discountDateExpire),
                    eventID: eventId
                }
            })

            return res.status(200).send({
                status: 'ok',
                msg: `Success creating ${data.name}`,
                data
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }
}