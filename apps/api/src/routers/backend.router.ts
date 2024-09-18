import { BackendController } from "@/controllers/backend.controller";
import { verifyToken } from "@/middlewares/token";
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
        this.router.get('/city', this.backendController.getCity)
        this.router.get('/province', this.backendController.getProvince)
        this.router.post('/province', this.backendController.postProvince)
        this.router.post('/city', this.backendController.postCity)
        this.router.post('/transaction', this.backendController.postTransaction)
        this.router.post('/checkRole', verifyToken, this.backendController.getRole)
    }

    getRouter():Router {
        return this.router
    }
}