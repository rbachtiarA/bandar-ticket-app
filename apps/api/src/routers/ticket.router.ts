import { EventController } from "@/controllers/event.controller";
import { TicketController } from "@/controllers/ticket.controller";
import { Router } from "express";

export class TicketRouter {
    private router: Router;
    private ticketController: TicketController;

    constructor() {
        this.ticketController = new TicketController();
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', this.ticketController.getTicket)
        this.router.post('/', this.ticketController.postTicket)
    }

    getRouter():Router {
        return this.router
    }
}