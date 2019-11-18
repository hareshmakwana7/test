import config from '@config/index';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';


const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  logging: ['error'],
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [join(__dirname, '../entities/**{.ts,.js}')],
  synchronize: false,
  migrations: ['migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
};

export = typeormConfig;
