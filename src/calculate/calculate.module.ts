import { Module } from '@nestjs/common';
import { CalculateController } from './calculate.controller';
import { CalculateService } from './calculate.service';
import { ShapesService } from '../Shapes/shapes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shape } from '../Shapes/shape.entity';
import { Material } from '../materials/material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shape, Material]), // обязательно
  ],
  controllers: [CalculateController],
  providers: [CalculateService, ShapesService],
})
export class CalculateModule {}
