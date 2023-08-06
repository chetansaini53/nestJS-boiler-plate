import { Module } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

export class TypeOrmConfigModule {}
// Remove the `@Injectable()` decorator from TypeOrmConfigService
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: `${process.env.DB_HOST}`,
      port: parseInt(`${process.env.DB_PORT}`, 3306),
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      entities: [User, Task],
      synchronize: false,
      logging: true,
    };
  }
}
