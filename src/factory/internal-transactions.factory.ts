import { AxiosRequestsImplementation } from "../repository/implementations/axios-requests.implementation";
import { InternalTransactionsUseCase } from "../usecases/transactions/internal-transactions.usecase";

function InternalTransactionsFactory(){
  const requestRepository = new AxiosRequestsImplementation();
  return new InternalTransactionsUseCase(requestRepository)
}

export {InternalTransactionsFactory};