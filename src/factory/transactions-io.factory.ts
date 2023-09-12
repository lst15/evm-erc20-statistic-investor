import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { TransactionsIOUseCase } from "../usecases/transactions/transactions-io.usecase";

function TransactionsIOFactory(){
  const web3Repository = new EthersWeb3Implementation();
  return new TransactionsIOUseCase(web3Repository);
}

export {TransactionsIOFactory};