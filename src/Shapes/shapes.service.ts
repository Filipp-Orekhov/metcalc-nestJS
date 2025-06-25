import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shape } from './shape.entity';
import { CreateShapeDto } from './dto/create-shape.dto';
import { Material } from '../materials/material.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ShapesService {
  constructor(
    @InjectRepository(Shape) private shapeRepo: Repository<Shape>,
    @InjectRepository(Material) private materialRepo: Repository<Material>,
  ) {}

  async findAll(): Promise<Shape[]> {
    return this.shapeRepo.find({ relations: ['materials'] });
  }

  async findOne(id: string): Promise<Shape & { materials: Material[] }> {
    const shape = await this.shapeRepo.findOne({ where: { id }, relations: ['materials'] });
    if (!shape) {
      throw new NotFoundException(`Форма с ID ${id} не найдена`);
    }

    return shape;
  }

  async create(dto: CreateShapeDto): Promise<Shape> {
    const materials = await this.materialRepo.find({
      where: dto.materialIds.map(id => ({ id })),
    });

    const shape = this.shapeRepo.create({
      name: dto.name,
      formula: dto.formula,
      requiredParams: dto.requiredParams,
      materials,
    });

    return this.shapeRepo.save(shape);
  }
}
