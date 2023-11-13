import telebot from "telebot";
import { addwalletDto } from "../dto/addwallet.dto";
import {
  appendWalletInFileUtil,
  removeFileContentUtil,
} from "../../utils/file-util";
import { clearWallets, wallets } from "../../lib/loader-wallets";

export function clearWalletsListener(telegram_bot: telebot) {
  telegram_bot.on("/clear", async (msg, props) => {
    clearWallets();
    removeFileContentUtil();

    return await telegram_bot.sendMessage(
      msg.from.id,
      "Removed all wallets with success" as any,
      {
        replyToMessage: msg.message_id,
      }
    );
  });
}
