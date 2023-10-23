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
  console.log(approvesGasMetrics);
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
  console.log("[requesting]");
  const msg = await profit(
    [
      "0x615ad11efc171e141c60be917a7a5913fcd96201".toLowerCase(),
      "0xb37042f3707d30a62de4ad023b3f85df32d4870d".toLowerCase(),
      "0xb5aa1826fe5871ad54f507f70cf6971ec9fd9d7b".toLowerCase(),
      "0x8ea294c42b17e335b2dfff2501f6f9a4c65b605c".toLowerCase(),
    ],
    "0xe784d58a669011311cf02880ec35657aef6e59e6".toLowerCase()
  );
  console.log(msg);
};
