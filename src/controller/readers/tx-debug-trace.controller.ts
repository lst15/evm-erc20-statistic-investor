import { TxDebugTraceFactory } from "../../factory/readers/tx-debug-trace.factory";

const TxDebugTraceController = (transactionHash: string) => {
  const factory = TxDebugTraceFactory();
  return factory.exec({ transactionHash });
};

export { TxDebugTraceController };
