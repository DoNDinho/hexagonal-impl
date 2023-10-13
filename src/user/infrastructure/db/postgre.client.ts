import { Pool } from 'pg';

export class PostgreClient {
  private client: Pool;

  constructor() {
    this.client = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
  }

  public async init() {
    await this.client.connect();
    console.log('Conectado a base de datos Postgre');
  }

  public async executeQuery<T>(query: string, queryName: string): Promise<T> {
    console.log(`Se ejecutara la query ${queryName}: ${query}`);
    const { rows } = await this.client.query(query);
    console.log(`Se ejecuto la query ${queryName}: `, JSON.stringify(rows));
    return rows as T;
  }
}
