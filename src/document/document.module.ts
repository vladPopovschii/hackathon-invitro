import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Document } from './document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), AiModule],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
