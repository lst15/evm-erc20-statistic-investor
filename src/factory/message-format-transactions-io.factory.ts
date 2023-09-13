import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { MessageFormatTransactionsIOUseCase } from "../usecases/transactions/message-format-transactions-io.usecase";

function MessageFormatTransactionsIOFactory(){
  const web3Repository = new EthersWeb3Implementation();
  return new MessageFormatTransactionsIOUseCase(web3Repository);
}

export {MessageFormatTransactionsIOFactory};