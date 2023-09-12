import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { IndexingTransactionsUseCase } from "../usecases/transactions/indexing-transactions.usecase";

function IndexingTransactionsFactory(){
  const web3Repository = new EthersWeb3Implementation()
  return new IndexingTransactionsUseCase(web3Repository);
}

export {IndexingTransactionsFactory};