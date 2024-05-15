import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './students/student.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), MongooseModule.forRoot('mongodb://tdk:tdk_1234@localhost:27017/tdk'), ProductsModule, OrdersModule, AuthModule, UserModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
