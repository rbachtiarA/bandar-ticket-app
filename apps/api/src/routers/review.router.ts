import { DiscountController } from "@/controllers/discount.controller";
import { ReviewController } from "@/controllers/review.controller";
import { Router } from "express";

export class ReviewRouter {
    private router: Router;
    private reviewController: ReviewController;

    constructor() {
        this.reviewController = new ReviewController();
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', this.reviewController.getReviews)
        this.router.post('/', this.reviewController.postReview)
    }

    getRouter():Router {
        return this.router
    }
}