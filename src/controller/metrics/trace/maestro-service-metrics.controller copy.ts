import { MaestroServiceMetricsFactory } from "../../../factory/metrics/trace/banana-service-metrics.factory";
import { TxDebugTraceModel } from "../../../model/tx-debug-trace.model";

export const MaestroServiceMetricsValueController = (
  txDebugTrace: TxDebugTraceModel[],
  user_address: string
) => {
  const factory = MaestroServiceMetricsFactory();
  return factory.exec({ txDebugTrace, user_address });
};
