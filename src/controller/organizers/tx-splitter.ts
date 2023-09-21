import { TxSplitterFactory } from "../../factory/organizers/tx-splitter.factory";
import { BuildContractsModel } from "../../model/main-contracts.model";

const TxSplitterController = async (
  build_contracts: BuildContractsModel,
  token_pair: string,
  user_address: string
) => {
  const factory = TxSplitterFactory();
  const execute = await factory.exec({
    build_contracts,
    token_pair,
    user_address,
  });

  if (execute instanceof Error) {
    //const code = (execute as any).error.code
    return false;
  }

  return execute;
};

export { TxSplitterController };
