import { EventLog } from "ethers";
import { TxDebugTraceFactory } from "../../../factory/readers/tx-debug-trace.factory";

const TxDebugTraceController = (
  txOtm: (EventLog & {
    operation: string;
  })[]
) => {
  const factory = TxDebugTraceFactory();
  return factory.exec({ txOtm });
};

export { TxDebugTraceController };
