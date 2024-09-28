import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInResponse } from './auth.dto';
import { AuthRequest } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<SignInResponse> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload: AuthRequest['user'] = {
      userId: user.id,
      email: user.email,
      personId: user.personId,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
