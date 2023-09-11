import { Web3Interface } from "../repository/interfaces/web3.interface";

interface GetBalanceUseCaseRequest {
  address:string;
}

class GetBalanceUseCase {
  constructor(private web3Repository:Web3Interface){}

  async exec({address}:GetBalanceUseCaseRequest){
    const balance = await this.web3Repository.getBalance(address);
    return balance;
  }

}

export {GetBalanceUseCase};