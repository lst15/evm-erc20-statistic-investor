import { GetTokenInfoFactory } from "../factory/get-token-info.factory";
import { BuildContractsModel } from "../model/main-contracts.model";

const GetTokenInfoController = (
  build_contracts: BuildContractsModel,
  token_address: string
) => {
  const factory = GetTokenInfoFactory();
  return factory.exec({ build_contracts, token_address });
};

export { GetTokenInfoController };
