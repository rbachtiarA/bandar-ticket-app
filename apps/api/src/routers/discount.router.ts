import { DiscountController } from "@/controllers/discount.controller";
import { Router } from "express";

export class DiscountRouter {
    private router: Router;
    private discountController: DiscountController;

    constructor() {
        this.discountController = new DiscountController();
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', this.discountController.getDiscountType)
        this.router.post('/', this.discountController.postDiscountType)
    }

    getRouter():Router {
        return this.router
    }
}