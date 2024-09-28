import { Module } from '@nestjs/common';
import { InvitroService } from './invitro.service';
import { InvitroController } from './invitro.controller';

@Module({
  providers: [InvitroService],
  controllers: [InvitroController],
})
export class InvitroModule {}
