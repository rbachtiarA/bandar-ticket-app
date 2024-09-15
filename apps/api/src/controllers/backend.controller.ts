//this file need to be removed before development
//this router used to add necessery data for exercise

import prisma from "@/prisma";
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
}

