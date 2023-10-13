import { User } from '../entitties/user';

export interface UserRepository {
  getById(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
