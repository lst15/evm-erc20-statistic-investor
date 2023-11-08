import { BuildMessageFactory } from "../../../factory/organizers/build-message.factory";

export function BuildMessageController(
  gasApproveMetrics: any,
  gasTransactionsMetrics: any,
  aggregatorMetrics: any,
  token_name: any,
  token_address: any,
  purchaseList: {
    bribe: BigInt;
    value: BigInt;
    hash: string;
    otmIndex: number;
  }[],
  sellList: { bribe: BigInt; value: BigInt; hash: string; otmIndex: number }[]
) {
  const factory = BuildMessageFactory();
  return factory.exec({
    gasApproveMetrics,
    gasTransactionsMetrics,
    aggregatorMetrics,
    token_name,
    token_address,
    purchaseList,
    sellList,
  });
}
