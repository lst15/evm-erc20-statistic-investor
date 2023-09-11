import { EthersWeb3Implementation } from "../repository/implementations/ethers-web3.implementation";
import { GetBalanceUseCase } from "../usecases/get-balance.usecase";

function GetBalanceFactory(){
  const web3Repository = new EthersWeb3Implementation();
  return new GetBalanceUseCase(web3Repository);
}

export {GetBalanceFactory};