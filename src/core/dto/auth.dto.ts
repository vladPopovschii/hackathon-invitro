import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// Enum for gender
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unspecified = 'Unspecified',
}

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpDto extends SignInDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  patronymicName: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ type: 'enum', enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  createAccountForDefaultOwnCompany: boolean;
}

export class SignInResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
