import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'sql104.infinityfree.com',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USER || 'if0_39363161',
  password: process.env.DB_PASSWORD || 'UGBMxq3fvnk9D',
  database: process.env.DB_NAME || 'if0_39363161_erp_system_iti',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
};
