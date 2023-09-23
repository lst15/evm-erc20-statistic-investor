interface BuildMessageUseCaseRequest {
  gasApproveMetrics: any;
  gasTransactionsMetrics: any;
  traceMetrics: any;
  txSeparator: any;
}

export class BuildMessageUsecase {
  exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    traceMetrics,
    txSeparator,
  }: BuildMessageUseCaseRequest) {
    for (var groupIndex in txSeparator) {
      const group = txSeparator[groupIndex];

      for (var transactionIndex in group) {
        const transaction = txSeparator[transactionIndex];
      }
    }
  }
}
