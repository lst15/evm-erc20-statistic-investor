import { BuildContractsController } from "./controller/build-contracts.controller";
import { GetTokenInfoController } from "./controller/get-token-info.controller";
import { txOTMController } from "./controller/mappers/tx-otm.controller";

import { CostByGroupTxSplitterController } from "./controller/cost-by-group-transactions-io.controller";
import { FormatTxSplitterController } from "./controller/format-transactions.io.controller";
import { env } from "./env-schema";
import { MessageFormatTxSplitterController } from "./controller/message-format-transactions-io.controller";
import { TxSeparatorController } from "./controller/organizers/tx-separator.controller";
import { TxSplitterController } from "./controller/organizers/tx-splitter";
import { TxTracerUseCase } from "./usecases/readers/tx-tracer.usecase";
import { TxTracerFactory } from "./factory/readers/tx-tracer.factory";

export async function profit(user_address: string, token_address: string) {
  // const txtrace = TxTracerFactory();
  // console.log(
  //   await txtrace.exec({
  //     transactionHash:
  //       "0x6416818def299b10d468f25820e7503dd07bd47b4fc4f19b111174ab30962847",
  //   })
  // );
  const build_contracts = BuildContractsController(token_address);
  const getTokenInfo = await GetTokenInfoController(
    build_contracts,
    token_address
  );

  const txSplitter = await TxSplitterController(
    build_contracts,
    getTokenInfo.pair as string,
    user_address
  );

  if (!txSplitter) return false;

  const txOtm = txOTMController(txSplitter);
  const txSeparator = TxSeparatorController(txOtm);
  //console.log(agrouping);
  // const costGroup = await CostByGroupTxSplitterController(
  //   txSeparator,
  //   txSplitter,
  //   build_contracts,
  //   user_address
  // );
  // console.log(costGroup);
  // const formated_transactions_group = await FormatTxSplitterController(
  //   costGroup,
  //   txSplitter,
  //   token_address
  // );

  // //const internal_transactions = await TxTracerController("0x0f96801d6f2b73b9de37e8a120c84de621ec5f5a9f7355d91b995fbf02820806")
  // return MessageFormatTxSplitterController(
  //   getTokenInfo,
  //   formated_transactions_group,
  //   token_address
  // );
}

(async () => {
  console.log(
    await profit(env.USER_ADDRESS, "0xBc01073dE0472eFAdB1A37a18f0cD5153d39B362")
  );
})();
