import { TraceMetricsUseCase } from "../../usecases/metrics/trace-metrics.usecase";

export function TraceMetricsFactory() {
  return new TraceMetricsUseCase();
}
