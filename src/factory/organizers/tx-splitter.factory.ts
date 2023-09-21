import { EthersWeb3Implementation } from "../../repository/implementations/ethers-web3.implementation";
import { TxSplitterUseCase } from "../../usecases/organizers/tx-splitter.usecase";

function TxSplitterFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new TxSplitterUseCase(web3Repository);
}

export { TxSplitterFactory };
