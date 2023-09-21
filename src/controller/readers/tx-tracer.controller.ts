import { TxTracerFactory } from "../../factory/readers/tx-tracer.factory";

const TxTracerController = (transactionHash: string) => {
  const factory = TxTracerFactory();
  return factory.exec({ transactionHash });
};

export { TxTracerController };
