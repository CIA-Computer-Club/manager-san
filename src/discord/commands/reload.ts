import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { log, warn, error } from "../../utils/console";
import { bot } from "../../index";
import { adminIDs } from "../../types/misc";
import { glob } from "glob";

export default {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload slash commands"),
  cooldown: 1,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!adminIDs.includes(interaction.user.id))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`❌ Error`)
            .setColor(`Red`)
            .setDescription(`Did not fuck around!`),
        ],
      });
    bot.commands.sweep(() => true);
    let commandFiles = await glob(`${__dirname}/../**/*.ts`);
    for (let file of commandFiles) {
      delete require.cache[require.resolve(file)];

      const pull = require(file).default;

      if (pull.data.name) {
        log({
          name: "Reload",
          description: `Reloaded ${pull.data.name} command`,
        });
        bot.slashCommandsMap.set(pull.data.name, pull);
      }
      if (pull.data.aliases && Array.isArray(pull.data.aliases))
        pull.data.aliases.forEach((alias: string) =>
          bot.slashCommandsMap.set(alias, pull.name),
        );
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Reloaded commands`)
          .setColor(`Green`)
          .setDescription(`Fucked around and found out!`),
      ],
      ephemeral: true,
    });
  },
};
