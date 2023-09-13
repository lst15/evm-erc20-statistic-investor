import { EventLog, ethers } from "ethers"
import { FormatValueController } from "./controller/format-value.controller"
import { MainContractsController } from "./controller/main-contracts.controller"
import { TokenInfoController } from "./controller/token-info.controller"
import { TransactionsIOController } from "./controller/transactions-io.controller"
import { IndexingTransactionsController } from "./controller/indexing-transactions.controller"
import { IndexingTransactionsModel } from "./model/indexing-transactions.model"
import { AgroupingTransactionsIOController } from "./controller/agrouping-transactions-io.controller"
import { CostByGroupTransactionsIoController } from "./controller/cost-by-group-transactions-io.controller"
import { FormatTransactionsIOController } from "./controller/format-transactions.io.controller"

(async () => {
  
  const token_address = "0x71c5ba4ebf1168b26cc8ea1154458979a3f5e3e0"
  const user_address = "0x6c9128a91ff9b9b7080306ec4b34b277b64c7742"

  const main_contracts = MainContractsController(token_address)
  const token_info = await TokenInfoController(main_contracts,token_address)

  const transactions_io = await TransactionsIOController(main_contracts,token_info.pair as string,user_address)
  if(!transactions_io) return false;
  
  const indexing = IndexingTransactionsController(transactions_io)   
  const agrouping = AgroupingTransactionsIOController(indexing)  
  const costGroup = await CostByGroupTransactionsIoController(agrouping);
  const formated_cost_group = FormatTransactionsIOController(costGroup);
})()