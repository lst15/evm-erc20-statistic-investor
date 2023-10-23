import { txOTMFactory } from "../../factory/mappers/tx-otm.factory";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { TxSplitterModel } from "../../model/tx-splitter.model";

const txOTMController = (txSplitter: TxSplitterModel) => {
  const factory = txOTMFactory();
  return factory.exec({ txSplitter });
};

export { txOTMController };
