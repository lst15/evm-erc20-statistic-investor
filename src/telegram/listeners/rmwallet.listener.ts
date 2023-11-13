import telebot from "telebot";
import { removeWallet, wallets } from "../../env-schema";
import { addwalletDto } from "../dto/addwallet.dto";

export function rmWalletListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/rmwallet (.+)$/, async (msg, props) => {
    const user_address = addwalletDto(props);
    let message;

    if (user_address instanceof Error) {
      message = user_address.message;
    } else {
      removeWallet(user_address);
      message = "Wallet removed with success";
    }

    return await telegram_bot.sendMessage(msg.from.id, message as any, {
      replyToMessage: msg.message_id,
    });
  });
}
