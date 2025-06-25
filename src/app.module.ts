import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Shape } from './Shapes/shape.entity';
import { Material } from './materials/material.entity';

import { ShapesModule } from './Shapes/shapes.module';
import { MaterialsModule } from './materials/materials.module';
import { CalculateModule } from './calculate/calculate.module';

import { AppController } from './app.controller';
import { MetalDataController } from './metal/MetalDataController';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT', '5432')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Shape, Material],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
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
