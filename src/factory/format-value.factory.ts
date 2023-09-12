import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { FormatValueUseCase } from "../usecases/format-value.usecase";

function FormatValueFactory(){
  const web3Repository = new EthersWeb3Implementation();
  return new FormatValueUseCase(web3Repository);
}

export {FormatValueFactory};