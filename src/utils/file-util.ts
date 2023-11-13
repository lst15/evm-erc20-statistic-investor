import fs from "fs";

export function appendWalletInFileUtil(wallet: String) {
  fs.appendFile(
    "wallets.txt",
    `\n${wallet as string | Uint8Array}`,
    function (err) {
      if (err) throw err;
    }
  );
}

export function removeFileContentUtil() {
  fs.writeFile("wallets.txt", "", function () {});
}
