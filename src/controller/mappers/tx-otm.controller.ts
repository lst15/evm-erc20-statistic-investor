import { txOTMFactory } from "../../factory/mappers/tx-otm.factory";
import { TransactionIOModel } from "../../model/transactions-io.model";

const txOTMController = (txSplitter: TransactionIOModel) => {
  const factory = txOTMFactory();
  return factory.exec({ txSplitter });
};

export { txOTMController };
