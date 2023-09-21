import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { GetTokenInfoUseCase } from "../usecases/readers/get-token-info.usecase";

function GetTokenInfoFactory() {
  const web3Repository = new EthersWeb3Implementation();
  return new GetTokenInfoUseCase(web3Repository);
}

export { GetTokenInfoFactory };
