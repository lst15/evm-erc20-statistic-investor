import { EventLog } from "ethers";
import { gasMetricsFactory } from "../../../factory/metrics/gas-metrics.factory";

export const gasMetricsController = async (
  txOtm: (EventLog & {
    operation: string;
  })[]
) => {
  const factory = gasMetricsFactory();
  return factory.exec({ txOtm });
};
