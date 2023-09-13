import { env } from "../env-schema";
import { MainContractsModel } from "../model/main-contracts.model";
import { TokenInfoModel } from "../model/token-info.model";
import { Web3Interface } from "../repository/interfaces/web3.interface";

interface TokenInfoUseCaseRequest{
  main_contracts:MainContractsModel,
  token_address:string
}

class TokenInfoUseCase {
  constructor(private web3Repository:Web3Interface){}

  async exec({main_contracts,token_address}:TokenInfoUseCaseRequest):Promise<TokenInfoModel>{
    return {
      pair:await main_contracts.factory_contract.getPair(
        token_address,
        env.WETH,
      ),
      name:await main_contracts.token_contract.name(),
      decimals: await main_contracts.token_contract.decimals(),
    }

  }

}

export {TokenInfoUseCase};