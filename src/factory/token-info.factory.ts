import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { TokenInfoUseCase } from "../usecases/token-info.usecase";

function TokenInfoFactory(){
  const web3Repository = new EthersWeb3Implementation();
  return new TokenInfoUseCase(web3Repository);
}

export {TokenInfoFactory}