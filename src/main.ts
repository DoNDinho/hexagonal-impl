import { RegisterUser } from './user/application/usecases/register-user.usecase';
import { PostgreClient } from './user/infrastructure/db/postgre.client';
import { PostgresDbClient } from './user/infrastructure/db/typeorm/postgre-db.client';
import { PostgreUserRepository } from './user/infrastructure/repositories/postgre-user.repository';
import { TypeormUserRepository } from './user/infrastructure/repositories/typeorm-user.repository';
import { UserController } from './user/infrastructure/server/controllers/user.controller';
import { Server } from './user/infrastructure/server/server';

async function main() {
  // * init db
  // const postgreClient = new PostgreClient();
  // await postgreClient.init();
  const postgreDbClient = new PostgresDbClient();
  await postgreDbClient.init();

  // * init repositories
  // const postgreUserRepository = new PostgreUserRepository(postgreClient);
  const typeormUserRepository = new TypeormUserRepository(postgreDbClient);

  // * init use cases
  const registerUser = new RegisterUser(typeormUserRepository);

  // * init controllers
  const userController = new UserController(registerUser);

  // * init server
  const server = new Server(userController);
  server.listen(3000);
}

main();
