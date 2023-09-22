import { UsuallyServiceMetricsFactory } from "../../factory/metrics/usually-service-metrics.factory";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";

export const UsuallyServiceMetricsValueController = (
  txDebugTrace: TxDebugTraceModel[],
  user_address: string
) => {
  const factory = UsuallyServiceMetricsFactory();
  return factory.exec({ txDebugTrace, user_address });
};
