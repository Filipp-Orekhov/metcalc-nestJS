import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Shape } from '../Shapes/shape.entity';
import rawData from '../mock-data.json';

const ShapesData = rawData as ShapesDataType;
@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepo: Repository<Material>,
    @InjectRepository(Shape)
    private shapeRepo: Repository<Shape>,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    const shape = await this.shapeRepo.findOneBy({ id: dto.shapeId });
    if (!shape) throw new NotFoundException('Форма не найдена');

    const materials = ShapesData.materials.map(matData =>
      this.materialRepo.create({
        id: matData.id,
        name: matData.name,
        density: matData.density,
      }),
    );

    await this.materialRepo.save(materials);
    return materials[0];
  }

  async findAll(): Promise<Material[]> {
    return this.materialRepo.find({ relations: ['shapes'] });
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepo.findOne({ where: { id }, relations: ['shapes'] });
    if (!material) throw new NotFoundException('Материал не найден');
    return material;
  }

  async delete(id: number) {
    await this.materialRepo.delete(id);
  }
}
