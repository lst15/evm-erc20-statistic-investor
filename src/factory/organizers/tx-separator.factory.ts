import { EthersWeb3Implementation } from "../../repository/implementations/ethers-web3.implementation";
import { TxSeparatorUseCase } from "../../usecases/organizers/tx-separator.usecase";

function TxSeparatorFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new TxSeparatorUseCase(web3Repository);
}

export { TxSeparatorFactory };
