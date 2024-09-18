import prisma from "@/prisma";
import { Request, Response } from "express";

export class ReviewController {
    async getReviews(req:Request, res:Response) {
        try {
            const data = await prisma.review.findMany()
            return res.status(200).send({
                status: 'ok',
                msg: 'Get all reviews',
                result:data
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }

    async postReview(req:Request, res:Response) {
        try {            
            const {
                rating,
                review,
                userId,
                eventId
            } = req.body

            const existEvent = await prisma.event.findUnique({
                where: {
                    id: +eventId
                }
            })
            if(!existEvent) throw 'Event not valid'

            const existUser = await prisma.user.findUnique({
                where:{
                    id: +userId
                }
            })
            if(!existUser) throw 'User not recognized or need login'

            // Disabled for presentation, cause need tweak alot data for testing
            // const userHaveTicket = await prisma.trasactionEvent.findFirst({
            //     where: {
            //         User: {
            //             id: existUser.id
            //         },
            //         Ticket: {
            //             some: {
            //                 ticketType: {
            //                     eventID: existEvent.id
            //                 }
            //             }
            //         }
            //     }
            // })
            // if(!userHaveTicket) throw 'User do not have authorization for giving review'
            const data = await prisma.review.create({
                data: {
                    rating: +rating,
                    review: review,
                    eventID: +eventId,
                    customerId: +userId
                }
            })

            return res.status(200).send({
                status: 'ok',
                msg: `Success creating review for ${existEvent.name}`,
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