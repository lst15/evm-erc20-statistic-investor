import fs from "fs";

export function appendWalletInFileUtil(wallet: String) {
  fs.appendFile(
    "wallets.txt",
    `${wallet as string | Uint8Array}\n`,
    function (err) {
      if (err) throw err;
    }
  );
}

export function removeFileContentUtil() {
  fs.writeFile("wallets.txt", "", function () {});
}
