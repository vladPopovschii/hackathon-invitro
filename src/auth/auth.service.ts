import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInResponse, SignUpDto } from '../core/dto/auth.dto';
import { AuthRequest } from './types';
import { InvitroService } from '../invitro/invitro.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private invitroService: InvitroService,
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

  async signUp(signUpDto: SignUpDto): Promise<SignInResponse> {
    const oldUser = await this.usersService.findByEmail(signUpDto.email);

    if (oldUser) {
      throw new ConflictException('Email is already in use');
    }

    const apiUser = await this.invitroService.createUser(signUpDto);

    const entity = await this.usersService.create({
      email: signUpDto.email,
      password: signUpDto.password,
      personId: apiUser.id,
    });

    return this.signIn(entity.email, entity.password);
  }
}
