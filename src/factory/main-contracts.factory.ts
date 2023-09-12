import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { MainContractsUseCase } from "../usecases/main-contracts.usecase";

function MainContractsFactory(){
  const web3Repository = new EthersWeb3Implementation();
  return new MainContractsUseCase(web3Repository)
}

export {MainContractsFactory};