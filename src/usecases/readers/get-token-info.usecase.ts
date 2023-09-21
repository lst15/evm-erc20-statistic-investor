import { env } from "../../env-schema";
import { BuildContractsModel } from "../../model/main-contracts.model";
import { GetTokenInfoModel } from "../../model/token-info.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface GetTokenInfoUseCaseRequest {
  build_contracts: BuildContractsModel;
  token_address: string;
}

class GetTokenInfoUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({
    build_contracts,
    token_address,
  }: GetTokenInfoUseCaseRequest): Promise<GetTokenInfoModel> {
    return {
      pair: await build_contracts.factory_contract.getPair(
        token_address,
        env.WETH
      ),
      name: await build_contracts.token_contract.name(),
      decimals: await build_contracts.token_contract.decimals(),
    };
  }
}

export { GetTokenInfoUseCase };
