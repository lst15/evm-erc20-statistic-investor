import { readFileUtil } from "../utils/read-file.utils";
export let wallets: string[] = [];

export async function loadWallets() {
  wallets = (await readFileUtil("wallets.txt")).split("\n") as string[];
  wallets = wallets.filter((wallet) => wallet != "");
}

export function clearWallets() {
  wallets = [];
}

loadWallets();
