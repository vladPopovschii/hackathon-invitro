import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InvitroService } from './invitro.service';
import { AuthRequest } from 'src/auth/types';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('invitro')
export class InvitroController {
  constructor(private readonly invitroService: InvitroService) {}

  @Get('appointments')
  getAppointments(@Req() { user }: AuthRequest) {
    return this.invitroService.getHistory(user.personId);
  }
}
