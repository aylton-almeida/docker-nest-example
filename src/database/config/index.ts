import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: true,
  migrations: [join(__dirname, '..', 'migrations', '*.ts')],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/database/entities',
    subscribersDir: 'src/database/subscribers',
  },
};
