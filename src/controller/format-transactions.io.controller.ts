import { FormatTxSplitterFactory } from "../factory/format-transactions-io.factory";
import { TransactionIOModel } from "../model/transactions-io.model";

const FormatTxSplitterController = (
  cost_group: any,
  txSplitter: TransactionIOModel,
  contract_address: string
) => {
  const factory = FormatTxSplitterFactory();
  return factory.exec({ cost_group, txSplitter, contract_address });
};

export { FormatTxSplitterController };
