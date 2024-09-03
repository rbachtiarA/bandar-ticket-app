//this file need to be removed before development
//this router used to add necessery data for exercise

import prisma from "@/prisma";
import { EventCatergory } from "@prisma/client";
import { Request, Response } from "express";

export class EventController {
    async getEvent(req:Request, res:Response) {
        
        try {
            const EventData = await prisma.event.findMany({
                include: {
                    city: {
                        include: {
                            province:true
                        }
                    }
                    
                }
            })
            
            return res.status(200).send({
                status: 'ok',
                msg: 'Get all event',
                result: EventData
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
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

    async getEventCategory(req:Request, res:Response) {
        try {
            const category = req.params.category[0].toUpperCase()+req.params.category.slice(1) 
            const EventData = await prisma.event.findMany({
                where: { category:  category as EventCatergory},
                include: { 
                    city: {
                    include: { 
                        province: true 
                        } 
                    }
                }
            })
            
            return res.status(200).send({
                status: 'ok',
                msg: 'Get all event',
                result: EventData
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }

    async getEventId(req:Request, res:Response) {
        
        try {
            const EventData = await prisma.event.findUnique({
                where: {
                    id: +req.params.id
                },
                include: {
                    city: {
                        include: {
                            province: true
                        }
                    }
                }
            })
            
            return res.status(200).send({
                status: 'ok',
                msg: `Get event id ${req.params.id}`,
                result: EventData
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }

    async getUpcomingEvent(req:Request, res:Response) {
        
        try {
            const EventData = await prisma.event.findMany({
                where: {
                    date_start: {
                        gt: new Date(Date.now())
                    }
                },
                include: {
                    city: {
                        include: {
                            province: true
                        }
                    }
                }
            })
            
            return res.status(200).send({
                status: 'ok',
                msg: 'Get all upcoming event',
                result: EventData
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }
    }
    

}

