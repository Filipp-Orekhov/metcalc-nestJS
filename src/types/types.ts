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
