import * as dotenv from 'dotenv';

let path: string;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env`;
    break;
  default:
    path = `${__dirname}/../../.env.dev`;
}
dotenv.config({ path, debug: true });

const config = {
  port: 8000,
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  kafkaBroker: process.env.KAFKA_BROKER,
  redisPort: process.env.REDIS_PORT,
  bucketName: process.env.BUCKET_NAME,
  imageLimit: 500, //in KB
  minioHost: process.env.MINIO_HOST,
  minioPort: process.env.MINIO_PORT,
};

export default config;
