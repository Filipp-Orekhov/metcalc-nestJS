import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shape } from '../Shapes/shape.entity';
import { Material } from '../materials/material.entity';
import rawShapesData from '../mock-data.json';

interface MaterialData {
  id: string;
  name: string;
  density: number;
}

interface ShapeData {
  id: string;
  name: string;
  formula: string;
  requiredParams: string[];
  materialIds: string[];
}

interface ShapesDataType {
  materials: MaterialData[];
  shapes: ShapeData[];
}

const ShapesData = rawShapesData as ShapesDataType;

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
    @InjectRepository(Shape)
    private readonly shapeRepo: Repository<Shape>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedIfEmpty();
  }

  async seedIfEmpty() {
    const shapeCount = await this.shapeRepo.count();
    if (shapeCount > 0) {
      console.log('[SeedService] База уже содержит данные, сид не требуется.');
      return;
    }

    console.log('[SeedService] Начинается загрузка начальных данных...');

    const materialEntities: Material[] = ShapesData.materials.map(matData => {
      const material = new Material();
      material.id = matData.id;
      material.name = matData.name;
      material.density = matData.density;
      return material;
    });

    await this.materialRepo.save(materialEntities);

    for (const shapeData of ShapesData.shapes) {
      const shape = this.shapeRepo.create({
        id: shapeData.id,
        name: shapeData.name,
        formula: shapeData.formula,
        requiredParams: shapeData.requiredParams,
        materials: shapeData.materialIds
          .map(matId => materialEntities.find(m => m.id === matId))
          .filter((m): m is Material => !!m),
      });

      await this.shapeRepo.save(shape);
    }

    console.log('[SeedService] Данные успешно загружены');
  }
}
