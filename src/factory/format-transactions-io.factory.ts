import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { FormatTransactionsIOUseCase } from "../usecases/transactions/format-transactions-io.usecase";

function FormatTransactionsIOFactory(){
  const web3Repository = new EthersWeb3Implementation()
  return new FormatTransactionsIOUseCase(web3Repository);
}

export {FormatTransactionsIOFactory};