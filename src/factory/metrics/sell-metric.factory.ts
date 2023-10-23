import { SellMetricUseCase } from "../../usecases/metrics/sell-metric.usecase";

export function SellMetricFactory() {
  return new SellMetricUseCase();
}
