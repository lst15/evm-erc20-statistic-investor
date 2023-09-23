import { env } from "./env-schema";
import { InternalCostTransactionsFactory } from "./factory/internal-cost-transactions.factory";
import { TxDebugTraceFactory } from "./factory/readers/tx-debug-trace.factory";
import { BuildContractsController } from "./controller/build-contracts.controller";
import { TxSplitterController } from "./controller/organizers/tx-splitter";
import { GetTokenInfoController } from "./controller/get-token-info.controller";
import { txOTMController } from "./controller/mappers/tx-otm.controller";
import { TxSeparatorController } from "./controller/organizers/tx-separator.controller";
import { EventLog, Transaction } from "ethers";
import { TxDebugTraceController } from "./controller/readers/tx-debug-trace.controller";
import { TraceMetricsController } from "./controller/metrics/trace-metrics.controller";
import { TxTraceMetrics } from "./model/tx-trace-metrics-model";
import { gasMetricsController } from "./controller/metrics/gas-metrics.controller";
import { GasApproveMetricsController } from "./controller/metrics/gas-approve-metrics.controller";
import { AggregatorMetricsController } from "./controller/metrics/aggregator-metrics.controller";

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
  //console.log(txSplitter.approve_transaction);
  const txOtm = txOTMController(txSplitter);
  const txSeparator = TxSeparatorController(txOtm);
  const transactionsGasMetrics = await gasMetricsController(txSeparator);
  const approvesGasMetrics = await GasApproveMetricsController(
    txSplitter.approve_transaction as EventLog[],
    token_address
  );
  const txDebugTrace = await TxDebugTraceController(txSeparator);
  const traceMetrigs = TraceMetricsController(
    txDebugTrace as any,
    user_address
  );

  const aggregatorMetrics = AggregatorMetricsController(
    approvesGasMetrics,
    transactionsGasMetrics,
    traceMetrigs
  );
  console.log(txSeparator);
}

(async () => {
  console.log(
    await profit(env.USER_ADDRESS, "0x4caed4056c99b9efcd2c85ecd34ad3f7b2d09544")
  );
})();
