import { Erc20AbiData } from "../data/erc20-abi.data";
import { FactoryAbiData } from "../data/factory-abi.data";
import { env } from "../env-schema";
import { MainContractsModel } from "../model/main-contracts.model";
import { Web3Interface } from "../repository/interfaces/web3.interface";

class MainContractsUseCase{
  constructor(private web3Repository:Web3Interface){}

  exec():MainContractsModel{
    const factory_contract = this.web3Repository.setContract(
      env.FACTORY,FactoryAbiData
    )
    
    const weth_contract = this.web3Repository.setContract(
      env.WETH,Erc20AbiData
    )

    return {factory_contract,weth_contract};
  }

}

export {MainContractsUseCase}