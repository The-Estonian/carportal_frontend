export interface CarType {
  modelName: string;
  make: string;
  releaseYear: number;
  fuelType?: string;
  emissions?: number;
  price?: number;
}
