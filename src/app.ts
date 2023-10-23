import { BuildContractsController } from "./controller/build-contracts.controller";
import { TxSplitterController } from "./controller/organizers/tx-splitter";
import { GetTokenInfoController } from "./controller/get-token-info.controller";
import { txOTMController } from "./controller/mappers/tx-otm.controller";
import { EventLog } from "ethers";
import { TxDebugTraceController } from "./controller/readers/tx-debug-trace.controller";
import { gasMetricsController } from "./controller/metrics/gas-metrics.controller";
import { GasApproveMetricsController } from "./controller/metrics/gas-approve-metrics.controller";
import { AggregatorMetricsController } from "./controller/metrics/aggregator-metrics.controller";
import { BuildMessageController } from "./controller/organizers/build-message.controller";
import { PurchaseMetricController } from "./controller/metrics/purchase-metric.controller";
import { SellMetricController } from "./controller/metrics/sell-metric.controller copy";

export async function profit(user_addresses: string[], token_address: string) {
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
  //console.log(txOtm[0]);
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

async () => {
  const msg = await profit(
    [
      "0x56dDd01A8E741c1770E6FdCDeAC0848b610dbdCb".toLowerCase(),
      "0xF5B158128C1c7538C95B19e9C45348FC18F1601C".toLowerCase(),
      "0x5fc666D2FB6F310241567166a779d4038D8e986b".toLowerCase(),
    ],
    "0xfCA99357C85F12E11F287648270E0689de3ea107".toLowerCase()
  );
  console.log(msg);
};
