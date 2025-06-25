import { Module } from '@nestjs/common';
import { ShapesService } from './shapes.service';
import { ShapesController } from './shapes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shape } from './shape.entity';
import { Material } from '../materials/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shape, Material])],
  providers: [ShapesService],
  exports: [ShapesService],
  controllers: [ShapesController],
})
export class ShapesModule {}
