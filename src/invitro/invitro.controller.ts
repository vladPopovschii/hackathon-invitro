import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InvitroService } from './invitro.service';
import { AuthRequest } from 'src/auth/types';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentDto } from './dto/appointment';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('invitro')
export class InvitroController {
  constructor(private readonly invitroService: InvitroService) {}

  @Get('specialities')
  getSpecialities() {
    return this.invitroService.getSpecialitie();
  }

  @Get('doctors')
  getDoctors(@Query('specialityId') specialityId: number) {
    return this.invitroService.getDoctors(specialityId);
  }

  @Get('services')
  getServices(@Query('doctorId') doctorId: number) {
    return this.invitroService.getRoutines(doctorId);
  }

  @Get('services/:id')
  getServiceById(@Param('id') id: number) {
    return this.invitroService.getRoutineById(id);
  }

  @Get('appointments')
  getAppointments(@Req() { user }: AuthRequest) {
    return this.invitroService.getAppointments(user.personId);
  }

  @Get('appointments/:id')
  getAppointmentById(@Param('id') id: number) {
    return this.invitroService.getAppointmentById(id);
  }

  @Post('appointments')
  createAppointments(
    @Req() { user }: AuthRequest,
    @Body() data: AppointmentDto,
  ) {
    return this.invitroService.createAppointments({
      ...data,
      personId: user.personId,
      unitId: 11,
    });
  }
}
