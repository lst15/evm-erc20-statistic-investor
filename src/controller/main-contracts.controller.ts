import { MainContractsFactory } from "../factory/main-contracts.factory"

const MainContractsController = (token_address:string) => {
  const factory = MainContractsFactory()
  return factory.exec({token_address});
}

export {MainContractsController};