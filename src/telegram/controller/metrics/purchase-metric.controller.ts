import { EventLog } from "ethers";
import { PurchaseMetricFactory } from "../../../factory/metrics/purchase-metric.factory";
import { TxDebugTraceModel } from "../../../model/tx-debug-trace.model";

export const PurchaseMetricController = (
  txDebugTrace: TxDebugTraceModel[],
  user_addresses: string[],
  txOtm: (EventLog & {
    operation: string;
  })[]
) => {
  const factory = PurchaseMetricFactory();
  const executed = factory.exec({
    txDebugTrace,
    txOtm,
    user_addresses,
  });

  return executed;
};
