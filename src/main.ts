import { RegisterUser } from './user/application/usecases/register-user.usecase';
import { PostgreClient } from './user/infrastructure/db/postgre.client';
import { PostgreUserRepository } from './user/infrastructure/repositories/postgre-user-repository';
import { UserController } from './user/infrastructure/server/controllers/user.controller';
import { Server } from './user/infrastructure/server/server';

async function main() {
  // * init db
  const postgreClient = new PostgreClient();
  await postgreClient.init();

  // * init repositories
  const postgreUserRepository = new PostgreUserRepository(postgreClient);

  // * init use cases
  const registerUser = new RegisterUser(postgreUserRepository);

  // * init controllers
  const userController = new UserController(registerUser);

  // * init server
  const server = new Server(userController);
  server.listen(3000);
}

main();
