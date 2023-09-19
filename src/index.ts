import { Client, IntentsBitField } from "discord.js";
import { Bot } from "./utils/bot";

export const bot = new Bot(
  new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildMessageReactions
    ],
  }),
);