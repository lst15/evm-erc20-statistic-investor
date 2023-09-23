import { EthersWeb3Implementation } from "../../repository/implementations/ethers-web3.implementation";
import { BuildMessageUsecase } from "../../usecases/organizers/build-message.usecase";

export function BuildMessageFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new BuildMessageUsecase(web3Repository);
}
