import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;
}
