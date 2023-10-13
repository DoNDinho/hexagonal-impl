import express, { Express } from 'express';
import { UserController } from './controllers/user.controller';

export class Server {
  private app: Express;

  constructor(private readonly userController: UserController) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true
      })
    );
    this.app.post('/v1/users', (req, res, next) => userController.registerUser(req, res, next));
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log('Servidor en puerto ', port);
    });
  }
}
