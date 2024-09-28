import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'invitro',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
