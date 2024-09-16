import { EventController } from "@/controllers/event.controller";
import { verifyToken } from "@/middlewares/token";
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
        this.router.get('/cat/:category', this.eventController.getEventCategory)
        this.router.get('/e/:slug', this.eventController.getEventSlug)
        this.router.get('/upcoming', this.eventController.getUpcomingEvent)
        // this.router.post('/', uploader('eventPoster-', '/eventPoster').single('image'),this.eventController.createEvent)
        this.router.post('/web' ,uploader('eventPoster-', '/eventPoster').single('eventPoster'),this.eventController.createEventWeb)
    }

    getRouter():Router {
        return this.router
    }
}