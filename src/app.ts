import { ethers } from "ethers"
import { FormatValueController } from "./controller/format-value.controller"
import { MainContractsController } from "./controller/main-contracts.controller"
import { TokenInfoController } from "./controller/token-info.controller"
import { TransactionsIOController } from "./controller/transactions-io.controller"

(async () => {
  
  const token_address = "0x71C5ba4EBf1168B26Cc8eA1154458979A3f5E3E0"
  const user_address = "0x6c9128a91ff9b9b7080306ec4b34b277b64c7742"

  const main_contracts = MainContractsController(token_address)
  const token_info = await TokenInfoController(main_contracts,token_address)
  const transactions_io = await TransactionsIOController(main_contracts,token_info.pair as string,user_address)
  console.log(transactions_io.contract_transactions.contract_transactions_out);

})()