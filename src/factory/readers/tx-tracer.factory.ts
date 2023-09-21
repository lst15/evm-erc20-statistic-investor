import { AxiosRequestsImplementation } from "../../repository/implementations/axios-requests.implementation";
import { TxTracerUseCase } from "../../usecases/readers/tx-tracer.usecase";

function TxTracerFactory() {
  const requestRepository = new AxiosRequestsImplementation();
  return new TxTracerUseCase(requestRepository);
}

export { TxTracerFactory };
