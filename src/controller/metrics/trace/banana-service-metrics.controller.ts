import { BananaServiceMetricsFactory } from "../../../factory/metrics/trace/maestro-service-metrics.factory";
import { TxDebugTraceModel } from "../../../model/tx-debug-trace.model";

export const BananaServiceMetricsValueController = (
  txDebugTrace: TxDebugTraceModel[],
  user_address: string
) => {
  const factory = BananaServiceMetricsFactory();
  return factory.exec({ txDebugTrace, user_address });
};
