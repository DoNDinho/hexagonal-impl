import { User } from '../../domain/entitties/user';
import { UserRepository } from '../../domain/repositories/user-repository';
import { PostgreClient } from '../db/postgre.client';

export class PostgreUserRepository implements UserRepository {
  constructor(private readonly postgreClient: PostgreClient) {
    this.postgreClient = postgreClient;
  }

  async getById(email: string): Promise<User> {
    const query = `SELECT * FROM USUARIO WHERE email = '${email}'`;
    const queryName = 'OBTENER_USUARIO_POR_MAIL';
    const result: any[] = await this.postgreClient.executeQuery(query, queryName);
    if (result.length === 0) return null;
    return new User({
      type: { id: result[0].idtipousuario },
      age: result[0].edad,
      contact: { email: result[0].email, phoneNumber: result[0].telefono },
      name: result[0].nombre
    });
  }

  async save(user: User): Promise<void> {
    const email = user.getContact().getEmail();
    const userType = user.getType().getId();
    const name = user.getName();
    const phone = user.getContact().getPhoneNumber();
    const age = user.getAge();
    const query = `INSERT INTO USUARIO VALUES ('${email}', ${userType}, '${name}', '${phone}', ${age})`;
    const queryName = 'INSERTAR_USUARIO';
    await this.postgreClient.executeQuery(query, queryName);
    console.log('Usuario guardado');
  }
}
