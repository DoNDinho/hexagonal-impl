import { DataSource } from 'typeorm';
import path from 'path';

export class PostgresDbClient {
  private readonly datasource: DataSource;

  constructor() {
    this.datasource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: 'public',
      entities: [
        path.join(__dirname, 'entities', '*.{js,ts}'),
        path.join(
          __dirname,
          '../../../..',
          'signatures',
          'infrastructure',
          'db',
          'typeorm',
          'entities',
          '*.{js,ts}'
        )
      ],
      useUTC: true,
      logging: false,
      synchronize: false,
      dropSchema: false
    });
  }

  public async init() {
    await this.datasource.initialize();
    console.log('Conectado a base de datos');
  }

  public getDatasource(): DataSource {
    return this.datasource;
  }

  // * Revisar esas variables de responseTime, para loguear
  public async executeQuery<T>(func: () => Promise<T>, queryName: string): Promise<T> {
    const initTime = new Date();
    try {
      const entity = await func();
      const endTime = new Date();
      const responseTime = endTime.getTime() - initTime.getTime();
      return entity;
    } catch (error) {
      const endTime = new Date();
      const responseTime = endTime.getTime() - initTime.getTime();
      const message = `Error al ejecutar query ${queryName}: ${error.message}`;
      throw new Error(message);
    }
  }
}
