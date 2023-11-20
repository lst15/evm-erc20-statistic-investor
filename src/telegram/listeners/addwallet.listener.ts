import telebot from "telebot";
import { addwalletDto } from "../dto/addwallet.dto";
import { appendWalletInFileUtil } from "../../utils/file-util";
import { wallets } from "../../lib/loader-wallets";

export function addWalletListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/addwallet (.+)$/, async (msg, props) => {
    const user_addresses = addwalletDto(props);

    user_addresses.forEach((address) => {
      wallets.push(address);
      appendWalletInFileUtil(address);
    });

    const message = "You added `" + user_addresses.length + "` addresses";

    return await telegram_bot.sendMessage(msg.from.id, message as any, {
      replyToMessage: msg.message_id,
      parseMode: "markdown",
    });
  });
}
