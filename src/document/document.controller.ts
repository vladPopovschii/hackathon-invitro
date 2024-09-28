import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../auth/types';
import { Response } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('/')
  getAll(@Req() { user }: AuthRequest) {
    return this.documentService.findAll(user.userId);
  }

  @Get('/:id')
  getById(@Req() { user }: AuthRequest, @Param('id') id: number) {
    return this.documentService.findOne(id, user.userId);
  }

  @Get('/:id/base64')
  async getByIdContent(
    @Req() { user }: AuthRequest,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const populatedDocument = await this.documentService.getDocumentContent(
      id,
      user.userId,
    );

    // Send the Base64 string response
    res.send(populatedDocument.base64Content);
  }

  @Get('/:id/ai-analysis')
  getAi(@Req() { user }: AuthRequest, @Param('id') id: number) {
    return this.documentService.getDocumentExplanation(id, user.userId);
  }
}
