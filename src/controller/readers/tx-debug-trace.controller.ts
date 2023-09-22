import { TxDebugTraceFactory } from "../../factory/readers/tx-debug-trace.factory";

const TxDebugTraceController = (txSeparator: any) => {
  const factory = TxDebugTraceFactory();
  return factory.exec({ txSeparator });
};

export { TxDebugTraceController };
