import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ClientModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

