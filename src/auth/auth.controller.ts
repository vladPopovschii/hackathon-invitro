import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponse } from './auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: SignInResponse })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    console.log('cuc');

    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
