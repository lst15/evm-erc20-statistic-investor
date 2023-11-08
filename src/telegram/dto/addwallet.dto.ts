import { ethers } from "ethers";
import { wallets } from "../../env-schema";

export function addwalletDto(props: any) {
  const args = props.match[1];

  if (!ethers.isAddress(args) || wallets.includes(args.toLowerCase()))
    return new Error("Invalid key param");

  return args;
}
