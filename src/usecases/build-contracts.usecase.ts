import { Erc20AbiData } from "../data/erc20-abi.data";
import { FactoryAbiData } from "../data/factory-abi.data";
import { env } from "../env-schema";
import { BuildContractsModel } from "../model/main-contracts.model";
import { Web3Interface } from "../repository/interfaces/web3.interface";

interface BuildContractsUseCaseRequest {
  token_address: string;
}

class BuildContractsUseCase {
  constructor(private web3Repository: Web3Interface) {}

  exec({ token_address }: BuildContractsUseCaseRequest): BuildContractsModel {
    const factory_contract = this.web3Repository.setContract(
      env.FACTORY,
      FactoryAbiData
    );

    const weth_contract = this.web3Repository.setContract(
      env.WETH,
      Erc20AbiData
    );

    const token_contract = this.web3Repository.setContract(
      token_address,
      Erc20AbiData
    );

    return { factory_contract, weth_contract, token_contract };
  }
}

export { BuildContractsUseCase };
