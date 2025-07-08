import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_EeHQN8O1Bcsa@ep-jolly-shadow-a8v62je4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
<<<<<<< HEAD

  //synchronize: process.env.DB_SYNCHRONIZE === 'true',
=======
>>>>>>> c9cf8b70cc7a6b8ef7942e48e3b7438764347bf5
};

