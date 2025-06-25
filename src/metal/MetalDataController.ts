import { Controller, Get } from '@nestjs/common';
import { ShapesService } from '../Shapes/shapes.service';
import { MaterialsService } from '../materials/materials.service';

@Controller('api')
export class MetalDataController {
  constructor(
    private readonly shapesService: ShapesService,
    private readonly materialsService: MaterialsService,
  ) {}

  @Get('metalData')
  async getMetalData() {
    const shapes = await this.shapesService.findAll();
    const materials = await this.materialsService.findAll();
    const shapesWithMaterialIds = shapes.map(shape => ({
      ...shape,
      materialIds: shape.materials?.map(m => m.id) ?? [],
    }));

    return {
      shapes: shapesWithMaterialIds,
      materials,
    };
  }
}
