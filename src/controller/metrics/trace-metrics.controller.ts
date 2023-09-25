import { TraceMetricsFactory } from "../../factory/metrics/trace-metrics.factory";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";

export function TraceMetricsController(
  txDebugTrace: TxDebugTraceModel[],
  user_address: string,
  txOtm: any
) {
  const factory = TraceMetricsFactory();
  return factory.exec({ txDebugTrace, user_address, txOtm });
}
