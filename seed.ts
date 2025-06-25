import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DataSource } from 'typeorm';
import { Material } from './src/materials/material.entity';

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
import rawShapesData from './src/mock-data.json';
// 2. Импортируем JSON с типом
const ShapesData = rawShapesData as ShapesDataType;

// 3. Импортируем сущности
import { Shape } from './src/Shapes/shape.entity';

// 4. В bootstrap или в нужном месте пишем заполнение
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    const shapeRepo = dataSource.getRepository(Shape);
    const materialRepo = dataSource.getRepository(Material);

    await dataSource.query('TRUNCATE TABLE "material", "shape" CASCADE');
    // Создаём материалы из JSON и сохраняем
    const materialEntities: Material[] = [];
    for (const matData of ShapesData.materials) {
        const material = new Material();
        material.id = matData.id;
        material.name = matData.name;
        material.density = matData.density;
        materialEntities.push(material);
    }

    await materialRepo.save(materialEntities);console.log('Сохранено материалов:', materialEntities.length);

    for (const shapeData of ShapesData.shapes) {
        const shape = shapeRepo.create({
            id: shapeData.id,
            name: shapeData.name,
            formula: shapeData.formula,
            requiredParams: shapeData.requiredParams,
            materials: shapeData.materialIds
                .map((matId) => materialEntities.find((m) => m.id === matId))
                .filter((m): m is Material => !!m),
        });

        await shapeRepo.save(shape);
    }

    await app.close();
}
bootstrap()
    .then(() => console.log('Данные успешно загружены'))
    .catch((err) => {
        console.error('Ошибка при загрузке данных:', err);
        process.exit(1);
    });