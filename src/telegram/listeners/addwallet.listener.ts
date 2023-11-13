import telebot from "telebot";
import { wallets } from "../../env-schema";
import { addwalletDto } from "../dto/addwallet.dto";

export function addWalletListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/addwallet (.+)$/, async (msg, props) => {
    const user_address = addwalletDto(props);
    let message;

    if (user_address instanceof Error) {
      message = user_address.message;
    } else {
      message = "Wallet added with success";
      wallets.push(user_address);
    }

    return await telegram_bot.sendMessage(msg.from.id, message as any, {
      replyToMessage: msg.message_id,
    });
  });
}
