import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig = require('../../../database/config');
import { AuthModule } from '../auth/auth.module';
import { Connection } from 'typeorm';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig = dbConfig as TypeOrmModuleOptions;

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
