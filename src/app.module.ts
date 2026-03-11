import { Module } from '@nestjs/common';
import { BooksModule } from './modules/books/books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './config/postgres.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
    }),
    BooksModule,
    AuthModule,
    UserModule,
    AdminModule,
  ],
})
export class AppModule {}
