import { AggregatorMetricsModel } from "../../model/aggregator-metrics.model";

interface AggregatorMetricsUseCaseRequest {
  gasApproveMetrics: any;
  gasTransactionsMetrics: any;
  purchaseList: { bribe: BigInt; value: BigInt; hash: string }[];
  sellList: { bribe: BigInt; value: BigInt; hash: string }[];
}

export class AggregatorMetricsUseCase {
  exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    purchaseList,
    sellList,
  }: AggregatorMetricsUseCaseRequest) {
    const metrics: AggregatorMetricsModel = {
      total_all_investiment: BigInt(0),
      total_all_profit: BigInt(0),
      total_all_sell: BigInt(0),
    };

    //metrics.total_all_investiment += gasApproveMetrics;

    purchaseList.forEach((element: any) => {
      metrics.total_all_investiment =
        element.value + metrics.total_all_investiment;

      metrics.total_all_investiment =
        element.bribe + metrics.total_all_investiment;
    });

    sellList.forEach((element: any) => {
      metrics.total_all_sell = element.value + metrics.total_all_sell;
    });

    gasTransactionsMetrics.forEach((element: any) => {
      metrics.total_all_investiment = element + metrics.total_all_investiment;
    });

    metrics.total_all_investiment =
      gasApproveMetrics + metrics.total_all_investiment;

    // for (var groupIndex in traceMetrics) {
    //   const traceGroup = traceMetrics[groupIndex];
    //   const gasTransactionsGroup = gasTransactionsMetrics[groupIndex];

    //   for (var transactionIndex in traceGroup) {
    //     const traceTransaction = traceGroup[transactionIndex];
    //     const gasTransaction = gasTransactionsGroup[transactionIndex];

    //     metrics.total_all_investiment += traceTransaction.bribe;
    //     metrics.total_all_investiment += traceTransaction.purchase;
    //     metrics.total_all_investiment += gasTransaction;
    //     metrics.total_all_sell += traceTransaction.received_onSell;
    //   }
    // }
    metrics.total_all_profit =
      metrics.total_all_sell - metrics.total_all_investiment;
    return metrics;
  }
}
