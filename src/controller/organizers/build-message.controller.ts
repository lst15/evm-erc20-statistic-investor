import { BuildMessageFactory } from "../../factory/organizers/build-message.factory";

export function BuildMessageController(
  gasApproveMetrics: any,
  gasTransactionsMetrics: any,
  traceMetrics: any,
  txSeparator: any,
  aggregatorMetrics: any,
  token_name: any,
  token_address: any
) {
  const factory = BuildMessageFactory();
  return factory.exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    traceMetrics,
    txSeparator,
    aggregatorMetrics,
    token_name,
    token_address,
  });
}
