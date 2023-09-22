import { UsuallyServiceMetricsUseCase } from "../../../usecases/metrics/trace/usually-service-metrics.usecase";

export function UsuallyServiceMetricsFactory() {
  return new UsuallyServiceMetricsUseCase();
}
