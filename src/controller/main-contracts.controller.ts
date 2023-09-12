import { MainContractsFactory } from "../factory/main-contracts.factory"

const MainContractsController = () => {
  const factory = MainContractsFactory()
  return factory.exec();
}

export {MainContractsController};