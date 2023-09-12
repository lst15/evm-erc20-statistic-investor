import { CostByGroupTransactionsIOFactory } from "../factory/cost-by-group-transactions-io.factory"

const CostByGroupTransactionsIoController = (groups:any[]) => {
  const factory = CostByGroupTransactionsIOFactory()
  return factory.exec({groups})
}

export {CostByGroupTransactionsIoController};