import { InternalCostTransactionsFactory } from "../factory/internal-cost-transactions.factory";
import { TxTracerModel } from "../model/internal-transactios.model";

const InternalCostTransactionsController = (
  internal_transactions: TxTracerModel[]
) => {
  const factory = InternalCostTransactionsFactory();
  return factory.exec({ internal_transactions });
};

export { InternalCostTransactionsController };
