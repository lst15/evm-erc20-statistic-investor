import { InternalCostTransactionsFactory } from "../factory/internal-cost-transactions.factory";
import { InternalTransactionsModel } from "../model/internal-transactios.model";

const InternalCostTransactionsController = (internal_transactions:InternalTransactionsModel[]) => {
  const factory =InternalCostTransactionsFactory();
  return factory.exec({internal_transactions})
}

export {InternalCostTransactionsController};