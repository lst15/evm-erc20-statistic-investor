import { AxiosRequestsImplementation } from "../repository/implementations/axios-requests.implementation";
import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { CostByGroupTxSplitterUseCase } from "../usecases/transactions/cost-by-group-transactions-io.usecase";

function CostByGroupTxSplitterFactory() {
  const web3Repository = new EthersWeb3Implementation();
  const requestsRepository = new AxiosRequestsImplementation();

  return new CostByGroupTxSplitterUseCase(web3Repository, requestsRepository);
}

export { CostByGroupTxSplitterFactory };
