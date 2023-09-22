import { env } from "./env-schema";
import { InternalCostTransactionsFactory } from "./factory/internal-cost-transactions.factory";
import { TxDebugTraceFactory } from "./factory/readers/tx-debug-trace.factory";
import { BuildContractsController } from "./controller/build-contracts.controller";
import { TxSplitterController } from "./controller/organizers/tx-splitter";
import { GetTokenInfoController } from "./controller/get-token-info.controller";
import { txOTMController } from "./controller/mappers/tx-otm.controller";
import { TxSeparatorController } from "./controller/organizers/tx-separator.controller";
import { Transaction } from "ethers";
import { TxDebugTraceController } from "./controller/readers/tx-debug-trace.controller";
import { TraceMetricsController } from "./controller/metrics/trace-metrics.controller";
import { TxTraceMetrics } from "./model/tx-trace-metrics-model";

export async function profit(user_address: string, token_address: string) {
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
  const txDebugTrace = await TxDebugTraceController(txSeparator);
  //console.log(txDebugTrace[0][0]);
  const traceMetrigs = TraceMetricsController(
    txDebugTrace as any,
    user_address
  );
  console.log(txDebugTrace[0][1]);
  // for (var groupIndex in txSeparator) {
  //   const group = txSeparator[groupIndex];

  //   for (var transactionIndex in group) {
  //     const transaction = group[transactionIndex];

  //     //if (transaction.operation == "sell") {
  //     const tranceTransaction = await TxDebugTraceController(
  //       transaction.transactionHash
  //     );

  //     const traceMetrics = TraceMetricsController(
  //       tranceTransaction,
  //       user_address
  //     );

  //     console.log(traceMetrics);
  //     //}
  //   }
  // }
  //console.log(totalTraceMetrics);
}

(async () => {
  console.log(
    await profit(env.USER_ADDRESS, "0x4caed4056c99b9efcd2c85ecd34ad3f7b2d09544")
  );
})();
