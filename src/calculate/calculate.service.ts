import { Injectable } from '@nestjs/common';
import { CalculateDto } from './dto/calculate.dto';
import { injectConstants } from '../utils/injectConstants';
import { ShapesService } from '../Shapes/shapes.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from '../materials/material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalculateService {
  constructor(
    private readonly shapesService: ShapesService,
    @InjectRepository(Material) private materialRepo: Repository<Material>,
  ) {}

  async calculate(dto: CalculateDto) {
    const { shapeId, materialId, params } = dto;

    const shape = await this.shapesService.findOne(shapeId);
    if (!shape) return { error: 'Некорректная форма проката' };

    const material = await this.materialRepo.findOne({ where: { id: materialId } });
    if (!material) return { error: 'Материал не найден' };

    const parsedFormula = injectConstants(shape.formula).replace(
      /density/g,
      material.density.toString(),
    );

    const missing = shape.requiredParams.filter(p => !params[p]);
    if (missing.length) return { error: `Не хватает параметров: ${missing.join(', ')}` };

    const args = shape.requiredParams.map(p => Number(params[p]));
    const func = new Function(...shape.requiredParams, `return ${parsedFormula}`);
    const result = func(...args);

    return { weight: result.toFixed(3) };
  }
}
