import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shape } from './Shapes/shape.entity';
import { Material } from './materials/material.entity';
import { ShapesModule } from './Shapes/shapes.module';
import { MaterialsModule } from './materials/materials.module';
import { CalculateModule } from './calculate/calculate.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetalDataController } from './metal/MetalDataController';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestuser',
      password: 'nestpass',
      database: 'metalcalc',
      autoLoadEntities: true,
      entities: [Shape, Material],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Shape, Material]),
    ShapesModule,
    MaterialsModule,
    CalculateModule,
  ],
  controllers: [AppController, MetalDataController],
  providers: [AppService],
})
export class AppModule {}
