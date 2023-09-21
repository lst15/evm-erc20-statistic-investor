import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { MessageFormatTxSplitterUseCase } from "../usecases/message-format-transactions-io.usecase";

function MessageFormatTxSplitterFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new MessageFormatTxSplitterUseCase(web3Repository);
}

export { MessageFormatTxSplitterFactory };
