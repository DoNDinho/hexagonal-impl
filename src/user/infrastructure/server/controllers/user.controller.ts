import { NextFunction, Request, Response } from 'express';
import { RegisterUser } from '../../../application/usecases/register-user.usecase';

export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUser) {
    this.registerUserUseCase = registerUserUseCase;
  }

  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.registerUserUseCase.execute(req.body);
      return res.status(200).json({});
    } catch (error) {
      next(error);
    } finally {
      next();
    }
  }
}
