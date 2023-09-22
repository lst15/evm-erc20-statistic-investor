import { EthersWeb3Implementation } from "../../repository/implementations/ethers-web3.implementation";
import { GasApproveMetricsUseCase } from "../../usecases/metrics/gas-approve-metrics.usecase";

export function GasApproveMetricsFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new GasApproveMetricsUseCase(web3Repository);
}
