import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class DashboardController {
  async getEventList(req: Request, res: Response, next: NextFunction) {
    try {
      const organizerId = req.user?.id;
      const data = await prisma.user.findMany({
        where: {
          id: organizerId,
        },
        include: {
          Event: {
            include: {
              Review: {
                include: {
                  customer: true,
                },
              },
            },
          },
        },
      });

      res.status(200).send({
        status: 'success',
        data,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  async getAttendees(req: Request, res: Response, next: NextFunction) {
    try {
      const organizerId = req.user?.id;
      const attendees = await prisma.event.findMany({
        where: {
          userId: organizerId,
        },
        include: {
          ticket_type: {
            include: {
              ticket: {
                include: {
                  transaction: {
                    include: {
                      User: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const formattedAttendees = attendees.flatMap((event) =>
        event.ticket_type.flatMap((ticketType) =>
          ticketType.ticket.map((ticket) => ({
            attendeeName: ticket.transaction.User.name,
            attendeeEmail: ticket.transaction.User.email,
            ticketType: ticketType.name,
            ticketPrice: ticketType.price,
            eventName: event.name,
            createdAt: ticket.createdAt,
          })),
        ),
      );

      res.status(200).json({
        status: 'success',
        data: formattedAttendees,
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  
}
