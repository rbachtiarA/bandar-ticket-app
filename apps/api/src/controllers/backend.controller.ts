import prisma from '@/prisma';
import { ICart } from '@/type/interface';
import { Request, Response } from 'express';

export class BackendController {
  async getCity(req: Request, res: Response) {
    const cityData = await prisma.city.findMany();

    return res.status(200).send({
      status: 'ok',
      msg: 'get all city',
      result: cityData,
    });
  }

  async getProvince(req: Request, res: Response) {
    const provinceData = await prisma.provinces.findMany({
      include: {
        cities: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).send({
      status: 'ok',
      msg: 'get all provinces',
      result: provinceData,
    });
  }

  async postProvince(req: Request, res: Response) {
    try {
      const { data } = req.body;

      const inpData = await prisma.provinces.createMany({
        data,
      });
      res.status(200).send({
        status: 'ok',
        msg: inpData,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error',
        msg: error,
      });
    }
  }
  async postCity(req: Request, res: Response) {
    try {
      const { name, province } = req.body;

      const existProvince = await prisma.provinces.findUnique({
        where: { name: province },
      });

      if (!existProvince) throw 'Province not Found!';
      const inpData = await prisma.city.create({
        data: { name, provinceID: existProvince.id },
      });
      res.status(200).send({
        status: 'ok',
        msg: inpData,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error',
        msg: error,
      });
    }
  }

  async postTransaction(req: Request, res: Response) {
    try {
      const { userId, cart, usePoints }: { userId: number; cart: ICart[], usePoints: boolean } = req.body;
      const dataTickets: { ticketTypeId: number }[] = [];
  
      let totalPrice = 0;
  
      cart.forEach(item => {
        const itemTotalPrice = item.totalPrice;
        totalPrice += itemTotalPrice;
        for (let i = 0; i < item.quantity; i++) {
          dataTickets.push({ ticketTypeId: item.ticketTypeId });
        }
      });
  
      // Fetch user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { wallet: true, points: true, discount: true },
      });
  
      if (!user) throw `User is not recognized`;
  
      // Apply discount if enabled
      if (user.discount) {
        totalPrice *= 0.9; // Apply 10% discount
      }
  
      // If points usage is enabled, use points first
      if (usePoints && user.points > 0) {
        const pointsToUse = Math.min(user.points, totalPrice); // Use up to the total price
        totalPrice -= pointsToUse; // Deduct the points from the total price
  
        // Deduct used points from user's account
        await prisma.user.update({
          where: { id: userId },
          data: { points: user.points - pointsToUse },
        });
      }
  
      // Check if the user has enough wallet balance after applying points
      if (user.wallet < totalPrice) {
        throw `Insufficient wallet balance. Available: ${user.wallet}, Required: ${totalPrice}`;
      }
  
      await prisma.$transaction(async (tx) => {
        for (const item of cart) {
          const existingItem = await tx.ticketType.findUnique({
            where: { id: item.ticketTypeId },
          });
          if (!existingItem) throw `Ticket not exist on database`;
  
          if (existingItem.quota - item.quantity < 0)
            throw `Insufficient quantity for ticket ${existingItem.name}`;
  
          await tx.ticketType.update({
            where: { id: item.ticketTypeId },
            data: { quota: existingItem.quota - item.quantity },
          });
        }
  
        // Create the transaction event
        await tx.trasactionEvent.create({
          data: {
            userId: userId,
            totalPrice,
            Ticket: {
              createMany: {
                data: dataTickets,
              },
            },
          },
        });
  
        // Deduct from user's wallet
        await tx.user.update({
          where: { id: userId },
          data: { wallet: user.wallet - totalPrice },
        });
      });
  
      return res.status(200).send({
        status: 'ok',
        msg: `Transaction Completed`,
      });
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        msg: `${error}`,
      });
    }

  }
  
  

  async getRole(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (
        userRole === 'CUSTOMER' ||
        userRole === 'ORGANIZER' ||
        userRole === 'ADMIN'
      ) {
        const existUser = await prisma.user.findUnique({
          where: {
            id: userId,
            role: userRole,
          },
        });
        if (!existUser) throw 'Invalid User(id)!';
      } else {
        throw 'Invalid User(role)!';
      }

      return res.status(201).send({
        status: 'ok',
        msg: 'success role',
        userId,
        userRole,
      });
    } catch (error) {
      return res.status(401).send({
        status: 'error',
        msg: error,
      });

    }
  }
}
