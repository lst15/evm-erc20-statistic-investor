import { ethers } from "ethers";
import { EthersHttpProvider } from "../../lib/ethers.provider";

export async function pDto(props: any) {
  const args = props.match[1];

  if (!ethers.isAddress(args)) return new Error("Invalid key param");

  const code = await EthersHttpProvider.getCode(args);
  if (code == "0x") return new Error("Invalid key param");
  return args;
}
