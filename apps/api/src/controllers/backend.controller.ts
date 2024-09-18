import prisma from "@/prisma";
import { ICart } from "@/type/interface";
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
        // try {
            // //cart : {quantity , ticketTypeId, totalPrice}
            
            try {
                const { userId, cart }: {userId:number, cart:ICart[]} = req.body
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

                await prisma.$transaction(async (tx) => {
                    const existUserId = await tx.user.findUnique({
                        where: {
                            id: userId
                        }
                    })

                    if(!existUserId) throw `User is not recognized`
                    
                    for (const item of cart) {
                        const existingItem = await tx.ticketType.findUnique({
                            where: { id: item.ticketTypeId }
                        })
                        if(!existingItem) throw `Ticket not exist on database`

                        if(existingItem.quota - item.quantity < 0) throw `Insufficient quantity for ticket ${existingItem.name}`
                        
                        await tx.ticketType.update({
                            where: { id: item.ticketTypeId},
                            data: {quota: existingItem.quota - item.quantity}
                        })
                    }
                    
                    await tx.trasactionEvent.create({
                        data: {
                            userId: userId,
                            totalPrice,
                            Ticket: {
                                createMany: {
                                    data: dataTickets
                                }
                            }
                        }
                    })
                    
                })

                return res.status(200).send({
                    status: 'ok',
                    msg: `Transaction Completed`
                })
            } catch (error) {                
                return res.status(400).send({
                    status: 'error',
                    msg: `${error}`
                })
            }
    }

    async getRole(req:Request, res:Response) {
        try {
            const userId = req.user?.id
            const userRole = req.user?.role

            if(userRole === 'CUSTOMER' || userRole === 'ORGANIZER' || userRole === 'ADMIN') {
                const existUser = await prisma.user.findUnique({
                    where: {
                        id: userId,
                        role: userRole
                    }
                })
                if(!existUser) throw 'Invalid User(id)!'

            } else {
                throw 'Invalid User(role)!'
            }

            return res.status(201).send({
                status: 'ok',
                msg: 'success role',
                userId, 
                userRole 
            })
        } catch (error) {
            return res.status(401).send({
                status: 'error',
                msg: error
            })
        }
    }
}

