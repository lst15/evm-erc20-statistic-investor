import { AxiosRequestsImplementation } from "../../repository/implementations/axios-requests.implementation";
import { TxDebugTraceUseCase } from "../../usecases/readers/tx-debug-trace.usecase";
function TxDebugTraceFactory() {
  const requestRepository = new AxiosRequestsImplementation();
  return new TxDebugTraceUseCase(requestRepository);
}

export { TxDebugTraceFactory };
