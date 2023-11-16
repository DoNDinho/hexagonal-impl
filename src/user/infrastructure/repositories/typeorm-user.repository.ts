import { User } from '../../domain/entitties/user';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserTypeEntity } from '../db/typeorm/entities/user-type.entity';
import { UserEntity } from '../db/typeorm/entities/user.entity';
import { PostgresDbClient } from '../db/typeorm/postgre-db.client';

export class TypeormUserRepository implements UserRepository {
  constructor(private readonly dbClient: PostgresDbClient) {
    this.dbClient = dbClient;
  }

  public async getById(email: string): Promise<User> {
    const queryName = 'OBTENER_USUARIO_POR_ID';
    const datasource = this.dbClient.getDatasource();
    const func = async () =>
      datasource.manager.findOne(UserEntity, {
        relations: {
          userType: true
        },
        where: {
          email
        }
      });
    const entity = await this.dbClient.executeQuery(func, queryName);
    console.log(JSON.stringify(entity, null, 4));
    if (!entity) {
      return null;
    }
    const userDto = {
      'type': {
        'id': entity?.userType?.id.toString()
      },
      'contact': {
        'email': entity?.email,
        'phoneNumber': entity?.phone
      },
      'name': entity?.name,
      'age': entity?.age
    };
    return new User(userDto);
  }

  public async save(user: User): Promise<void> {
    const userTypeEntity = new UserTypeEntity();
    userTypeEntity.id = parseInt(user.getType().getId());
    const userEntity = new UserEntity();
    userEntity.email = user.getContact().getEmail();
    userEntity.phone = user.getContact().getPhoneNumber();
    userEntity.name = user.getName();
    userEntity.age = user.getAge();
    userEntity.userType = userTypeEntity;
    const queryName = 'REGISTRAR_USUARIO';
    const datasource = this.dbClient.getDatasource();
    const func = async () =>
      datasource.createQueryBuilder().insert().into(UserEntity).values(userEntity).execute();
    await this.dbClient.executeQuery(func, queryName);
  }
}
