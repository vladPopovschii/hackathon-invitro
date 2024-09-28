import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import * as path from 'path';
import { promises as fs } from 'fs';
import { AiService } from '../ai/ai.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documents: Repository<Document>,
    private readonly aiService: AiService,
  ) {}

  findAll(userId: number): Promise<Document[]> {
    return this.documents.find({ where: { userId } });
  }

  findOne(id: number, userId: number): Promise<Document> {
    return this.documents.findOne({ where: { id, userId } });
  }

  async getDocumentContent(id: number, userId: number): Promise<Document> {
    const document = await this.findOne(id, userId);
    if (!document) throw new BadRequestException('Document not found');

    const imagePath = path.join('static', `${id}.jpg`);
    const imageBuffer = await fs.readFile(imagePath);

    document.base64Content = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

    return document;
  }

  async getDocumentExplanation(id: number, userId: number): Promise<string> {
    const doc = await this.getDocumentContent(id, userId);
    return this.aiService.explain(
      doc.analysisReason,
      doc.base64Content,
      doc.type,
    );
  }
}
