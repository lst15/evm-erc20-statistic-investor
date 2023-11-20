import { ethers } from "ethers";
import { wallets } from "../../lib/loader-wallets";

export function rmWalletDto(props: any) {
  const args = props.match[1].split(" ");
  let addresses: any[] = [];

  args.forEach((address: string) => {
    if (ethers.isAddress(address) && wallets.includes(address.toLowerCase())) {
      addresses.push(address.toLowerCase());
    }
  });

  return addresses;
}
