import { env } from "../../env-schema";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface BuildMessageUseCaseRequest {
  gasApproveMetrics: any;
  gasTransactionsMetrics: any;
  traceMetrics: any;
  txSeparator: any;
  aggregatorMetrics: any;
  token_name: any;
  token_address: any;
}

export class BuildMessageUsecase {
  constructor(private web3Repository: Web3Interface) {}

  exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    traceMetrics,
    txSeparator,
    aggregatorMetrics,
    token_name,
    token_address,
  }: BuildMessageUseCaseRequest) {
    let message = `${token_name}\n`;
    message += "`" + token_address + "`\n\n";

    for (var groupIndex in txSeparator) {
      const group = txSeparator[groupIndex];
      const traceMetricsGroup = traceMetrics[groupIndex];
      const gasTransactionMetricsGroup = gasTransactionsMetrics[groupIndex];

      for (var transactionIndex in group) {
        const transaction = group[transactionIndex];
        const traceMetricsTransaction = traceMetricsGroup[transactionIndex];
        const gasTransactionMetricsTransaction =
          gasTransactionMetricsGroup[transactionIndex];

        if (transaction.operation == "buy") {
          message += `Buy: ${env.BLOCKSCAN}${transaction.transactionHash}\n`;
          message +=
            `Token Investiment: ` +
            "`" +
            this.web3Repository
              .formatEther(traceMetricsTransaction.purchase)
              .toFixed(5) +
            "`\n";
          message +=
            `Bribe: ` +
            "`" +
            this.web3Repository
              .formatEther(traceMetricsTransaction.bribe)
              .toFixed(5) +
            "`\n";
        }

        if (transaction.operation == "sell") {
          message += `Sell: ${env.BLOCKSCAN}${transaction.transactionHash}\n`;
          message +=
            `Token Sell: ` +
            "`" +
            this.web3Repository
              .formatEther(traceMetricsTransaction.received_onSell)
              .toFixed(5) +
            "`\n";
        }
        message +=
          `Gas Fee: ` +
          "`" +
          this.web3Repository
            .formatEther(gasTransactionMetricsTransaction)
            .toFixed(5) +
          "`\n";
        message += "\n";
      }
    }

    message +=
      `Total Investment: ` +
      "`" +
      this.web3Repository
        .formatEther(aggregatorMetrics.total_all_investiment)
        .toFixed(5) +
      "`\n";

    message +=
      `Total Sell: ` +
      "`" +
      this.web3Repository
        .formatEther(aggregatorMetrics.total_all_sell)
        .toFixed(5) +
      "`\n";

    message +=
      `Total Approve: ` +
      "`" +
      this.web3Repository.formatEther(gasApproveMetrics).toFixed(5) +
      "`\n";

    message +=
      `Total Profit: ` +
      "`" +
      this.web3Repository
        .formatEther(aggregatorMetrics.total_all_profit)
        .toFixed(5) +
      "`\n";

    return message;
  }
}
