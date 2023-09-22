import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { InternalCostTransactionsUseCase } from "../usecases/transactions/internal-cost-transactions.usecase";

function InternalCostTransactionsFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new InternalCostTransactionsUseCase(web3Repository);
}

export { InternalCostTransactionsFactory };
