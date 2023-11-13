import telebot from "telebot";
import { addwalletDto } from "../dto/addwallet.dto";
import { removeLineFromFile } from "../../utils/remove-line-file.util";

export function rmWalletListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/rmwallet (.+)$/, async (msg, props) => {
    const user_address = addwalletDto(props);
    let message;

    if (user_address instanceof Error) {
      message = user_address.message;
    } else {
      removeLineFromFile("wallets.txt", user_address);
      message = "Wallet removed with success";
    }

    return await telegram_bot.sendMessage(msg.from.id, message as any, {
      replyToMessage: msg.message_id,
    });
  });
}
