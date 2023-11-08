import { EventLog } from "ethers";
import { BuildContractsController } from "../controller/build-contracts.controller";
import { GetTokenInfoController } from "../controller/get-token-info.controller";
import { txOTMController } from "../controller/mappers/tx-otm.controller";
import { AggregatorMetricsController } from "../controller/metrics/aggregator-metrics.controller";
import { GasApproveMetricsController } from "../controller/metrics/gas-approve-metrics.controller";
import { gasMetricsController } from "../controller/metrics/gas-metrics.controller";
import { PurchaseMetricController } from "../controller/metrics/purchase-metric.controller";
import { SellMetricController } from "../controller/metrics/sell-metric.controller copy";
import { BuildMessageController } from "../controller/organizers/build-message.controller";
import { TxSplitterController } from "../controller/organizers/tx-splitter";
import { TxDebugTraceController } from "../controller/readers/tx-debug-trace.controller";

export async function GetWalletsProfitAction(
  user_addresses: string[],
  token_address: string
) {
  const build_contracts = BuildContractsController(token_address);
  const getTokenInfo = await GetTokenInfoController(
    build_contracts,
    token_address
  );

  const txSplitter = await TxSplitterController(
    build_contracts,
    getTokenInfo.pair as string,
    user_addresses
  );

  if (!txSplitter) return;

  const txOtm = txOTMController(txSplitter);
  const transactionsGasMetrics = await gasMetricsController(txOtm);

  const approvesGasMetrics = await GasApproveMetricsController(
    txSplitter.approves as EventLog[],
    token_address
  );

  const txDebugTrace = await TxDebugTraceController(txOtm);

  const purchaseMetric = PurchaseMetricController(
    txDebugTrace,
    user_addresses,
    txOtm
  );

  const sellMetric = SellMetricController(txDebugTrace, user_addresses, txOtm);

  const aggregatorMetrics = AggregatorMetricsController(
    approvesGasMetrics,
    transactionsGasMetrics,
    purchaseMetric,
    sellMetric
  );

  const message = BuildMessageController(
    approvesGasMetrics,
    transactionsGasMetrics,
    aggregatorMetrics,
    getTokenInfo.name,
    token_address,
    purchaseMetric,
    sellMetric
  );

  return message;
}
