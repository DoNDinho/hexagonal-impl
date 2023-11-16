import { User } from '../../domain/entitties/user';
import { UserRepository } from '../../domain/repositories/user-repository';

export class MongoDbUserRepository implements UserRepository {
  async getById(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
