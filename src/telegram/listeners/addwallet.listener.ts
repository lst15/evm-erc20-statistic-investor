import telebot from "telebot";
import { addwalletDto } from "../dto/addwallet.dto";
import { appendWalletInFileUtil } from "../../utils/file-util";
import { wallets } from "../../lib/loader-wallets";

export function addWalletListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/addwallet (.+)$/, async (msg, props) => {
    console.log(wallets);
    const user_address = addwalletDto(props);
    let message;

    if (user_address instanceof Error) {
      message = user_address.message;
    } else {
      wallets.push(user_address);
      appendWalletInFileUtil(user_address);
      message = "Wallet added with success";
    }

    return await telegram_bot.sendMessage(msg.from.id, message as any, {
      replyToMessage: msg.message_id,
    });
  });
}
