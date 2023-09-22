import { gasMetricsFactory } from "../../factory/metrics/gas-metrics.factory";

export const gasMetricsController = async (txSeparator: any) => {
  const factory = gasMetricsFactory();
  return factory.exec({ txSeparator });
};
