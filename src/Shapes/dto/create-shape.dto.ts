import { IsArray, IsString, IsNumber } from 'class-validator';

class MaterialDto {
  @IsString()
  name: string;

  @IsNumber()
  density: number;
}

export class CreateShapeDto {
  @IsString()
  name: string;

  @IsString()
  formula: string;

  @IsArray()
  @IsString({ each: true })
  requiredParams: string[];

  @IsArray()
  @IsString({ each: true })
  materialIds: string[]; // <-- только id материалов
}
