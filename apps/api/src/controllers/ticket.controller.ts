//this file need to be removed before development
//this router used to add necessery data for exercise

import { string_to_slug } from "@/lib/slugGenerate";
import prisma from "@/prisma";
import { EventCatergory } from "@prisma/client";
import { Request, Response } from "express";

export class TicketController {
    async getTicket(req:Request, res:Response) {
        try {
            const data = prisma.ticketType.findMany()
            return res.status(200).send({
                status: 'ok',
                msg: 'Get all ticket type',
                result:data
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }

    async postTicket(req:Request, res:Response) {
        try {            
            const { ticketName, ticketDescription, ticketPrice, ticketQuota, eventId } = req.body
            
            const data = await prisma.ticketType.create({
                data: {
                    name: ticketName,
                    description: ticketDescription,
                    price: ticketPrice,
                    quota: ticketQuota,
                    eventID: Number(eventId),
                }
            })

            return res.status(200).send({
                status: 'ok',
                msg: `Success creating ${ticketName}`,
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