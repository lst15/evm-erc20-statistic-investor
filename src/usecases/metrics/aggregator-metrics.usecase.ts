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
  }: AggregatorMetricsUseCaseRequest) {}
}
