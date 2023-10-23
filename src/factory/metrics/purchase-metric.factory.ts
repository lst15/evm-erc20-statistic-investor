import { PurchaseMetricUseCase } from "../../usecases/metrics/purchase-metric.usecase";

export function PurchaseMetricFactory() {
  return new PurchaseMetricUseCase();
}
