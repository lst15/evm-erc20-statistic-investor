import { BuildMessageFactory } from "../../factory/organizers/build-message.factory";

export function BuildMessageController(
  gasApproveMetrics: any,
  gasTransactionsMetrics: any,
  traceMetrics: any,
  txSeparator: any
) {
  const factory = BuildMessageFactory();
  return factory.exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    traceMetrics,
    txSeparator,
  });
}
