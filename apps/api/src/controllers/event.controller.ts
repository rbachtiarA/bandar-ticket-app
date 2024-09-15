//this file need to be removed before development
//this router used to add necessery data for exercise

import { string_to_slug } from "@/lib/slugGenerate";
import prisma from "@/prisma";
import { EventCatergory, Prisma } from "@prisma/client";
import { Request, Response } from "express";

export class EventController {
    async getEvent(req:Request, res:Response) {
        
        try {
            const { search, category, location } = req.query
            let filter: Prisma.EventWhereInput = {}

            if(search) {
                filter.name = { contains: search as string }
            }
            if(category === "Music" || category === "Sport" || category === "Seminar" || category === "Gallery" || category === "Entertainment") {
                filter.category = { equals: category }
            }
            if(location) {
                filter.city = { provinceID: +location }
            }

            const EventData = await prisma.event.findMany({
                where: filter,
                orderBy: {
                    date_start: 'desc'
                },
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
                where: { name: city }
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

    async getEventSlug(req:Request, res:Response) {
        
        try {
            const EventData = await prisma.event.findFirst({
                where: {
                    slug: req.params.slug
                },
                include: {
                    city: {
                        include: {
                            province: true
                        }
                    }
                }                
            })
            const TicketData = await prisma.ticketType.findMany({
                where: {
                    eventID: EventData?.id
                }
            })
            return res.status(200).send({
                status: 'ok',
                msg: `Get event id ${req.params.id}`,
                event: EventData,
                ticket: TicketData
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
                    },
                    user: {
                        select: {
                            name: true,
                        }
                    },
                    ticket_type: {
                        select: { price:true }
                    }

                },
                
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
    
    async createEventWeb(req:Request, res:Response){
        try {                                 
            const { 
                userId,
                eventName,
                eventCategory,
                eventDateStart,
                eventDateEnd, 
                eventTimeStart, 
                eventTimeEnd, 
                eventDescription, 
                eventAddress,
                eventProvince,
                eventCity,
                EventPoster
            } = req.body
            if(!req.file) throw 'No File Uploaded'; 
            const imgLink = `http://localhost:8000/api/public/eventPoster/${req?.file?.filename}`
        
            const existCity = await prisma.city.findFirst({
                where: { id: +eventCity}
            })
            
            if(!existCity) throw 'City not found'
            
            const existUser = await prisma.user.findUnique({
                where: { id: +userId }
            })

            if(!existUser) throw 'User is not recognized'

            const eventData = await prisma.event.create({
                data: {
                    name: eventName,
                    slug: string_to_slug(eventName),
                    description: eventDescription,
                    category: eventCategory,
                    location: eventAddress,
                    cityId: existCity.id ,
                    date_start: (new Date(eventDateStart)).toISOString(),
                    date_end: (new Date(eventDateEnd)).toISOString(),
                    time_start: eventTimeStart,
                    time_end: eventTimeEnd,
                    img_poster: imgLink,
                    max_quota: 1,
                    userId: +userId
                }
            })

            res.status(200).send({
                status: 'ok',
                msg: `Success creating event ${eventName}`,
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
