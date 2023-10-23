import { AggregatorMetricsFactory } from "../../factory/metrics/aggregator-metrics.factory";

export function AggregatorMetricsController(
  gasApproveMetrics: any,
  gasTransactionsMetrics: any,
  purchaseList: { bribe: BigInt; value: BigInt; hash: string }[],
  sellList: { bribe: BigInt; value: BigInt; hash: string }[]
) {
  const factory = AggregatorMetricsFactory();
  return factory.exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    purchaseList,
    sellList,
  });
}
