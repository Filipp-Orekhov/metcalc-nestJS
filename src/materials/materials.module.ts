import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material } from './material.entity';
import { Shape } from '../Shapes/shape.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Shape])],
  providers: [MaterialsService],
  exports: [MaterialsService],
  controllers: [MaterialsController],
})
export class MaterialsModule {}
