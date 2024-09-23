import { DashboardController } from '@/controllers/dashboard.controller';
import { checkOrganizer, verifyToken } from '@/middlewares/token';
import { Router } from 'express';

export class DashboardRouter {
  private router: Router;
  private dashboardController: DashboardController;

  constructor() {
    this.dashboardController = new DashboardController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      checkOrganizer,
      this.dashboardController.getEventList,
    );
    this.router.get(
      '/attendees',
      verifyToken,
      checkOrganizer,
      this.dashboardController.getAttendees,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
