import { Controller, Post, Body } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { CalculateDto } from './dto/calculate.dto';

@Controller()
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculateDto) {
    return this.calculateService.calculate(dto);
  }
}
