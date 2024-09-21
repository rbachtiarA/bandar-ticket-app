import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import './cron';
import './crontest';
import cors from 'cors';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { BackendRouter } from './routers/backend.router';
import path from 'path'
import { EventRouter } from './routers/event.router';
import { UserRouter } from './routers/user.routers';
import { TicketRouter } from './routers/ticket.router';
import { DiscountRouter } from './routers/discount.router';
import { ReviewRouter } from './routers/review.router';
export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    // this.app.use(cors({
    //   origin: 'http://localhost:3000',
    //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    //   allowedHeaders: ['Content-Type', 'Authorization']
    // }));
    this.app.use(cors())
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/public',
      express.static(path.join(__dirname, "../public"))
    )
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const backendRouter = new BackendRouter();
    const eventRouter = new EventRouter();
    const userRouter = new UserRouter();
    const ticketRouter = new TicketRouter()
    const discountRouter = new DiscountRouter()
    const reviewRouter = new ReviewRouter()
    
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/backend', backendRouter.getRouter());
    this.app.use('/api/event', eventRouter.getRouter());
    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api/ticket', ticketRouter.getRouter())
    this.app.use('/api/discount', discountRouter.getRouter())
    this.app.use('/api/review', reviewRouter.getRouter())

  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
