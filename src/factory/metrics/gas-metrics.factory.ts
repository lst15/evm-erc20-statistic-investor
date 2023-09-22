import { GasMetricsUseCase } from "../../usecases/metrics/gas-metrics.usecase";

export function gasMetricsFactory() {
  return new GasMetricsUseCase();
}
