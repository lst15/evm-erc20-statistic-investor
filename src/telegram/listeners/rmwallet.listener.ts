import telebot from "telebot";
import { addwalletDto } from "../dto/addwallet.dto";
import { removeLineFromFile } from "../../utils/remove-line-file.util";
import { rmWalletDto } from "../dto/rmwallet.dto";
import { wallets } from "../../lib/loader-wallets";

export function rmWalletListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/rmwallet (.+)$/, async (msg, props) => {
    const user_address = rmWalletDto(props);

    user_address.forEach((address) => {
      removeLineFromFile("wallets.txt", address);
      wallets.splice(wallets.indexOf(address), 1);
    });

    const message = "Was removed `" + user_address.length + "` addresses";

    return await telegram_bot.sendMessage(msg.from.id, message as any, {
      replyToMessage: msg.message_id,
      parseMode: "markdown",
    });
  });
}
