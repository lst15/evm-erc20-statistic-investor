import { BananaServiceMetricsUseCase } from "../../usecases/metrics/banana-service-metrics.usecase";

export function BananaServiceMetricsFactory() {
  return new BananaServiceMetricsUseCase();
}
