import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('ai')
export class AiController {
  constructor() {}
}
