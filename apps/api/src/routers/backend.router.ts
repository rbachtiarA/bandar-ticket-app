import { BackendController } from "@/controllers/backend.controller";
import { Router } from "express";

export class BackendRouter {
    private router: Router;
    private backendController: BackendController;

    constructor() {
        this.backendController = new BackendController();
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', this.backendController.getCity)
        this.router.post('/province', this.backendController.postProvince)
        this.router.post('/city', this.backendController.postCity)
    }

    getRouter():Router {
        return this.router
    }
}