import { EventLog } from "ethers";
import { SellMetricFactory } from "../../../factory/metrics/sell-metric.factory";
import { TxDebugTraceModel } from "../../../model/tx-debug-trace.model";

export const SellMetricController = (
  txDebugTrace: TxDebugTraceModel[],
  user_addresses: string[],
  txOtm: (EventLog & {
    operation: string;
  })[]
) => {
  const factory = SellMetricFactory();
  const executed = factory.exec({
    txDebugTrace,
    txOtm,
    user_addresses,
  });

  return executed;
};
