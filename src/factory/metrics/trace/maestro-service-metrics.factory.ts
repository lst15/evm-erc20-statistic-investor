import { BananaServiceMetricsUseCase } from "../../../usecases/metrics/trace/banana-service-metrics.usecase";

export function BananaServiceMetricsFactory() {
  return new BananaServiceMetricsUseCase();
}
