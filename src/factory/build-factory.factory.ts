import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { BuildContractsUseCase } from "../usecases/build-contracts.usecase";

function BuildContractsFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new BuildContractsUseCase(web3Repository);
}

export { BuildContractsFactory };
