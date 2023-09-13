

import { MainContractsController } from "./controller/main-contracts.controller"
import { TokenInfoController } from "./controller/token-info.controller"
import { TransactionsIOController } from "./controller/transactions-io.controller"
import { IndexingTransactionsController } from "./controller/indexing-transactions.controller"

import { AgroupingTransactionsIOController } from "./controller/agrouping-transactions-io.controller"
import { CostByGroupTransactionsIoController } from "./controller/cost-by-group-transactions-io.controller"
import { FormatTransactionsIOController } from "./controller/format-transactions.io.controller"
import { env } from "./env-schema"
import { MessageFormatTransactionsIOController } from "./controller/message-format-transactions-io.controller"
import { EthersHttpProvider } from "./lib/ethers.provider"
import { InternalTransactionsController } from "./controller/internal-transactions.controller"
import { InternalCostTransactionsController } from "./controller/internal-cost-transactions.controller"

export async function profit(token_address:string){
  const main_contracts = MainContractsController(token_address)
  const token_info = await TokenInfoController(main_contracts,token_address)

  const transactions_io = await TransactionsIOController(main_contracts,token_info.pair as string,env.USER_ADDRESS)
  if(!transactions_io) return false;
  
  const indexing = IndexingTransactionsController(transactions_io)   
  const agrouping = AgroupingTransactionsIOController(indexing)  
  const costGroup = await CostByGroupTransactionsIoController(agrouping);
  const formated_transactions_group = await FormatTransactionsIOController(costGroup,transactions_io,token_address);

  //const internal_transactions = await InternalTransactionsController("0x0f96801d6f2b73b9de37e8a120c84de621ec5f5a9f7355d91b995fbf02820806")
  return MessageFormatTransactionsIOController(token_info,formated_transactions_group);  
}

(async() => {
  console.log(await profit("0xa856f8b2cc2ac062e416da02330feb7740240f84"))
  //const internal_transactions = await InternalTransactionsController("0x0f96801d6f2b73b9de37e8a120c84de621ec5f5a9f7355d91b995fbf02820806")
  //const info_internal_cost = InternalCostTransactionsController(internal_transactions)
})()