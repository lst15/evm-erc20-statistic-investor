import { UsuallyServiceMetricsUseCase } from "../../usecases/metrics/usually-service-metrics.usecase";

export function UsuallyServiceMetricsFactory() {
  return new UsuallyServiceMetricsUseCase();
}
