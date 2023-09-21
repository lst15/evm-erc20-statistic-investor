import { Contract } from "ethers";

export class BuildContractsModel {
  readonly weth_contract!: Contract;
  readonly factory_contract!: Contract;
  readonly token_contract!: Contract;
}
