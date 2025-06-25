import { IsString, IsNumber } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  name: string;

  @IsNumber()
  density: number;

  @IsString()
  shapeId: string;
}
