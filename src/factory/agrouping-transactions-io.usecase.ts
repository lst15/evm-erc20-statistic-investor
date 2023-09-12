import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { AgroupingTransactionsIOUseCase } from "../usecases/transactions/agrouping-transactions-io.usecase";

function AgroupingTransactionsIOFactory(){
  const web3Repository = new EthersWeb3Implementation();
  return new AgroupingTransactionsIOUseCase(web3Repository);
}

export {AgroupingTransactionsIOFactory}