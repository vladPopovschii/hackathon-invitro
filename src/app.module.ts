import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { InvitroModule } from './invitro/invitro.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, InvitroModule],
})
export class AppModule {}
