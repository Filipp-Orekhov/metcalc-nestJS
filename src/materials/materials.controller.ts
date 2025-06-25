import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  async create(@Body() dto: CreateMaterialDto) {
    console.log('Create DTO:', dto);
    const material = await this.materialsService.create(dto);
    console.log('Created material:', material);
    return material;
  }

  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.delete(+id);
  }
}
