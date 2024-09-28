import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponse, SignUpDto } from '../core/dto/auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: SignInResponse })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: SignInResponse })
  signUp(@Body() signUpDto: SignUpDto): Promise<SignInResponse> {
    return this.authService.signUp(signUpDto);
  }
}
