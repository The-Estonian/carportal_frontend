export interface CarType {
  id: number;
  modelName: string;
  make: string;
  releaseYear: number;
  fuelType?: string;
  emissions?: number;
  price?: number;
}
