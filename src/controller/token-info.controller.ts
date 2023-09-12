import { TokenInfoFactory } from "../factory/token-info.factory";
import { MainContractsModel } from "../model/main-contracts.model";

const TokenInfoController = (
  main_contracts:MainContractsModel,
  token_address:string
) => {
  const factory = TokenInfoFactory()
  return factory.exec({main_contracts,token_address})
}

export {TokenInfoController};