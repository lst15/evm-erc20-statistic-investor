import { readFileUtil } from "../utils/read-file.utils";
export let wallets: string[] = [];

export async function loadWallets() {
  wallets = (await readFileUtil("wallets.txt")).split("\n") as string[];
}

export function clearWallets() {
  wallets = [];
}

loadWallets();
