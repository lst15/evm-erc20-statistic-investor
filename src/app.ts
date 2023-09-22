import { BananaServiceMetricsValueController } from "./controller/metrics/trace/banana-service-metrics.controller";
import { MaestroServiceMetricsValueController } from "./controller/metrics/maestro-service-metrics.controller copy";
import { UsuallyServiceMetricsValueController } from "./controller/metrics/usually-service-metrics.controller copy 2";
import { env } from "./env-schema";
import { InternalCostTransactionsFactory } from "./factory/internal-cost-transactions.factory";
import { TxDebugTraceFactory } from "./factory/readers/tx-debug-trace.factory";

export async function profit(user_address: string, token_address: string) {
  const txtrace = TxDebugTraceFactory();
  const txTraceExec = await txtrace.exec({
    transactionHash:
      "0xb984c4d19513cc0043ed3d6d03c0e2644ea524392137ef41c354b013ec9aaccb",
  });
  // txTraceExec.forEach((tx) => {
  //   if ("value" in tx) console.log(tx);
  // });
  //console.log(txTraceExec);
  const bananaBribe = BananaServiceMetricsValueController(
    txTraceExec,
    user_address
  );

  const maestroBribe = MaestroServiceMetricsValueController(
    txTraceExec,
    user_address
  );

  const usuallyBribe = UsuallyServiceMetricsValueController(
    txTraceExec,
    user_address
  );

  console.log(usuallyBribe);
  //console.log(txTraceExec);
  // const internal = InternalCostTransactionsFactory();
  // const internalExec = internal.exec({
  //   user_address: user_address,
  //   internal_transactions: txTraceExec,
  // });
  // console.log(internalExec);
  // const build_contracts = BuildContractsController(token_address);
  // const getTokenInfo = await GetTokenInfoController(
  //   build_contracts,
  //   token_address
  // );

  // const txSplitter = await TxSplitterController(
  //   build_contracts,
  //   getTokenInfo.pair as string,
  //   user_address
  // );

  // if (!txSplitter) return false;

  // const txOtm = txOTMController(txSplitter);
  // const txSeparator = TxSeparatorController(txOtm);
  // console.log(txSeparator);
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
