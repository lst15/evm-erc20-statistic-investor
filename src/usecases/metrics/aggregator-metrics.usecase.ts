import { AggregatorMetricsModel } from "../../model/aggregator-metrics.model";

interface AggregatorMetricsUseCaseRequest {
  gasApproveMetrics: any;
  gasTransactionsMetrics: any;
  traceMetrics: any;
}

export class AggregatorMetricsUseCase {
  exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    traceMetrics,
  }: AggregatorMetricsUseCaseRequest) {
    const metrics: AggregatorMetricsModel = {
      total_all_investiment: BigInt(0),
      total_all_profit: BigInt(0),
      total_all_sell: BigInt(0),
    };

    //metrics.total_all_investiment += gasApproveMetrics;

    for (var groupIndex in traceMetrics) {
      const traceGroup = traceMetrics[groupIndex];
      const gasTransactionsGroup = gasTransactionsMetrics[groupIndex];

      for (var transactionIndex in traceGroup) {
        const traceTransaction = traceGroup[transactionIndex];
        const gasTransaction = gasTransactionsGroup[transactionIndex];

        metrics.total_all_investiment += traceTransaction.bribe;
        metrics.total_all_investiment += traceTransaction.purchase;
        metrics.total_all_investiment += gasTransaction;
        metrics.total_all_sell += traceTransaction.received_onSell;
      }
    }
    metrics.total_all_profit =
      metrics.total_all_sell - metrics.total_all_investiment;
    return metrics;
  }
}
