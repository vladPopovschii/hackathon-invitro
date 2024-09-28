import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  @ApiProperty()
  @IsNotEmpty()
  doctorId: number;
}

export class CreateAppointment extends AppointmentDto {
  personId: number;
  unitId: number;
}
