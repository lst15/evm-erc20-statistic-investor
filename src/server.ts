import telebot from "telebot";
import { env } from "./env-schema";
import { addWalletListener } from "./telegram/listeners/addwallet.listener";
import { pListener } from "./telegram/listeners/p.listener";
import { rmWalletListener } from "./telegram/listeners/rmwallet.listener";
import { walletsListener } from "./telegram/listeners/wallets.listener";

export const telegram_bot = new telebot({
  token: env.TG_BOT_TOKEN,
});

addWalletListener(telegram_bot);
pListener(telegram_bot);
rmWalletListener(telegram_bot);
walletsListener(telegram_bot);
telegram_bot.start();
