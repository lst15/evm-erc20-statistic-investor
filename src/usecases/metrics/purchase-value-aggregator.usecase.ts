import { TxTracerModel } from "../../model/tx-tracer.model";

interface PurchaseValueAggregatorUseCaseRequest {
  txSeparator: any;
  txTracer: TxTracerModel[];
}

class PurchaseValueAggregatorUseCase {
  exec({ txSeparator, txTracer }: PurchaseValueAggregatorUseCaseRequest) {
    let purchase = [];

    for (let groupIndex in txSeparator) {
      const index = parseInt(groupIndex);
      purchase.push([]);

      txTracer.forEach((transaction) => {});
    }
  }
}
