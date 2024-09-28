import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { InvitroModule } from 'src/invitro/invitro.module';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    InvitroModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
