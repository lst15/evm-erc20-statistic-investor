import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { FormatTxSplitterUseCase } from "../usecases/format-transactions-io.usecase";

function FormatTxSplitterFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new FormatTxSplitterUseCase(web3Repository);
}

export { FormatTxSplitterFactory };
