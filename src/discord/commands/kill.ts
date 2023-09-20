import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } from "discord.js";
  import { adminIDs } from "../../types/misc";
  
  export default {
    data: new SlashCommandBuilder()
      .setName("kill")
      .setDescription("Kill manager-san"),
    cooldown: 1,
    async execute(interaction: ChatInputCommandInteraction) {
      if (!adminIDs.includes(interaction.user.id))
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`❌ Error`)
              .setColor(`Red`)
              .setDescription(`Who let you kill her!`),
          ],
        });  
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Reloaded commands`)
            .setColor(`Green`)
            .setDescription(`Killed the manager!`),
        ],
        ephemeral: true,
      });
      process.exit();
    },
  };
  