import { EthersWeb3Implementation } from "../../repository/implementations/ethers-web3.implementation";
import { TxOTMUseCase } from "../../usecases/mappers/tx-otm.usecase";

function txOTMFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new TxOTMUseCase(web3Repository);
}

export { txOTMFactory };
