import { BuildContractsFactory } from "../../factory/build-factory.factory";

const BuildContractsController = (token_address: string) => {
  const factory = BuildContractsFactory();
  return factory.exec({ token_address });
};

export { BuildContractsController };
