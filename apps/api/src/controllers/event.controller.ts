//this file need to be removed before development
//this router used to add necessery data for exercise

import prisma from "@/prisma";
import { Request, Response } from "express";

export class EventController {
    async getEvent(req:Request, res:Response) {
        const EventData = await prisma.event.findMany()

        return res.status(200).send({
            status: 'ok',
            msg: 'Get all event',
            result: EventData
        })
    }

    async createEvent(req:Request, res:Response){
        try {           
            const { 
                name,
                location,
                city, 
                category, 
                date_start, 
                date_end, 
                max_quota
            } = req.body
            const imgLink = `http://localhost:8000/api/public/eventPoster/${req?.file?.filename}`
            
            const existCity = await prisma.city.findFirst({
                where: { city: city }
            })

            if(!existCity) throw 'City not found'
            const eventData = await prisma.event.create({
                data: {
                    name,
                    category,
                    location,
                    cityId: existCity.id ,
                    date_start: (new Date(date_start)).toISOString(),
                    date_end: (new Date(date_end)).toISOString(),
                    img_poster: imgLink,
                    max_quota: +max_quota
                }
            })

            res.status(200).send({
                status: 'ok',
                msg: 'event created !',
                eventData
            })
            
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
        
    }
}

