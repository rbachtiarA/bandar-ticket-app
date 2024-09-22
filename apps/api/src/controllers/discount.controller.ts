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

            const existEvent = prisma.event.findUnique({
                where: {
                    id: +eventId
                }
            })
            if(!existEvent) throw 'Event not valid'

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