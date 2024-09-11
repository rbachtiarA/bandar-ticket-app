//this file need to be removed before development
//this router used to add necessery data for exercise

import prisma from "@/prisma";
import { ICart } from "@/type/interface";
import { TicketType } from "@prisma/client";
import { Request, Response } from "express";

export class BackendController {
    async getCity(req:Request, res:Response) {
        const cityData = await prisma.city.findMany()

        return res.status(200).send({
            status: 'ok',
            msg: 'get all city',
            result: cityData
        })
    }

    async getProvince(req:Request, res:Response) {
        const provinceData = await prisma.provinces.findMany({
            include: {
                cities: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        return res.status(200).send({
            status: 'ok',
            msg: 'get all provinces',
            result: provinceData
        })
    }

    async postProvince(req:Request, res:Response) {
        try {
            const { data } = req.body
                      

            const inpData = await prisma.provinces.createMany({
                data
            })
            res.status(200).send({
                status: 'ok',
                msg: inpData
            })
            
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }

    }
    async postCity(req:Request, res:Response) {
        try {
            const { name, province } = req.body
            
            const existProvince = await prisma.provinces.findUnique({
                where: { name: province }
            })

            if(!existProvince) throw 'Province not Found!'
            const inpData = await prisma.city.create({
                data: { name, provinceID: existProvince.id }
            })
            res.status(200).send({
                status: 'ok',
                msg: inpData
            })
            
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msg: error
            })
        }

    }

    async postTransaction(req:Request, res:Response) {
        try {
            const { userId, cart }: {userId:number, cart:ICart[]} = req.body
            //cart : {quantity , ticketTypeId, totalPrice}
            const dataTickets: {ticketTypeId:number}[] = []

            let totalPrice = 0

            cart.map((item) => {
                if(Number(item.quantity) == 1) {
                    dataTickets.push({ticketTypeId: item.ticketTypeId})
                } else {
                    for (let i = 0; i < item.quantity; i++) { 
                        dataTickets.push({ticketTypeId: item.ticketTypeId})
                    }
                }
                totalPrice += item.totalPrice
            })
            
            if(dataTickets.length === 0) throw 'No item in cart'
            
            const dataTransaction:any = await prisma.$transaction(async (tx) => {
                cart.map(async (item) => {
                    const updatedTicketType = await tx.ticketType.update({
                        where: {
                            id: item.ticketTypeId
                        },
                        data: {
                            quota: {
                                decrement: item.quantity
                            }
                        }
                    });
                })
                
                const successTransaction = await tx.trasactionEvent.create({
                    data: {
                        customerId: userId,
                        totalPrice,
                        Ticket: {
                            createMany: {
                                data: dataTickets
                            }
                        }
                    }
                })
                
                return successTransaction
            })
            
            return res.status(200).send({
                status: 'ok',
                msg: 'Transaction Success',
                dataTransaction
                
            }) 
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                msg: error
            })            
        }
    }
}

