import { AggregatorMetricsFactory } from "../../factory/metrics/aggregator-metrics.factory";

export function AggregatorMetricsController(
  gasApproveMetrics: any,
  gasTransactionsMetrics: any,
  traceMetrics: any
) {
  const factory = AggregatorMetricsFactory();
  return factory.exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    traceMetrics,
  });
}
