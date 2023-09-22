import { EventLog } from "ethers";
import { GasApproveMetricsFactory } from "../../factory/metrics/gas-approve-metrics.factory";

export const GasApproveMetricsController = async (
  approve_transactions: EventLog[],
  token_address: string
) => {
  const factory = GasApproveMetricsFactory();
  return factory.exec({ approve_transactions, token_address });
};
