import { EthersWeb3Implementation } from "../../repository/implementations/ethers-web3.implementation";
import { GasMetricsUseCase } from "../../usecases/metrics/gas-metrics.usecase";

export function gasMetricsFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new GasMetricsUseCase(web3Repository);
}
