import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DocumentType {
  RADIOGRAPHY = 'radiography',
  BLOOD_ANALYSIS = 'blood_analysis',
  URINE_ANALYSIS = 'urine_analysis',
  ENZYMES = 'ENZYMES',
  USG = 'usg',
  MRI = 'mri',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false, name: 'user_id' })
  userId: number;

  @Column({ type: 'character varying', nullable: false })
  type: DocumentType;

  @Column({
    type: 'character varying',
    nullable: false,
    name: 'analysis_reason',
  })
  analysisReason: string;

  @Column({
    type: 'character varying',
    nullable: true,
    name: 'ready_at',
  })
  readyAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  base64Content: string;
}
