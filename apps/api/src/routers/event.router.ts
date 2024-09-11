import { EventController } from "@/controllers/event.controller";
import { uploader } from "@/middlewares/uploader";
import { Router } from "express";

export class EventRouter {
    private router: Router;
    private eventController: EventController;

    constructor() {
        this.eventController = new EventController();
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', this.eventController.getEvent)
        this.router.post('/', uploader('eventPoster-', '/eventPoster').single('image'),this.eventController.createEvent)
    }

    getRouter():Router {
        return this.router
    }
}