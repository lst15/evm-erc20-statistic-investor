import { AggregatorMetricsUseCase } from "../../usecases/metrics/aggregator-metrics.usecase";

export function AggregatorMetricsFactory() {
  return new AggregatorMetricsUseCase();
}
