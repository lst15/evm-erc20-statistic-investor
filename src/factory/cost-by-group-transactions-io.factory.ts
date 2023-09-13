import { AxiosRequestsImplementation } from "../repository/implementations/axios-requests.implementation";
import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { CostByGroupTransactionsIOUseCase } from "../usecases/transactions/cost-by-group-transactions-io.usecase";

function CostByGroupTransactionsIOFactory(){
  const web3Repository = new EthersWeb3Implementation();
  const requestsRepository = new AxiosRequestsImplementation();

  return new CostByGroupTransactionsIOUseCase(web3Repository,requestsRepository);
}

export {CostByGroupTransactionsIOFactory};