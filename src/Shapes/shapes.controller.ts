import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ShapesService } from './shapes.service';
import { CreateShapeDto } from './dto/create-shape.dto';

@Controller('shapes')
export class ShapesController {
  constructor(private readonly shapesService: ShapesService) {}

  @Get()
  getAll() {
    return this.shapesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.shapesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateShapeDto) {
    return this.shapesService.create(dto);
  }
}
