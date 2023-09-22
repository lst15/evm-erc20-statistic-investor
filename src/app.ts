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

  txSeparator.forEach((group: any) => {
    group.forEach(async (transaction: any) => {
      if (transaction.operation == "buy") {
        const tranceTransaction = await TxDebugTraceController(
          transaction.transactionHash
        );
        const traceMetrics = TraceMetricsController(
          tranceTransaction,
          user_address
        );
        console.log(traceMetrics);
      }
    });
  });
}

(async () => {
  console.log(
    await profit(env.USER_ADDRESS, "0x7a2631aa3590fd6361d2d7afb51d5fe9d33ab2ec")
  );
})();
