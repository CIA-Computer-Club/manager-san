import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot latency!"),
  cooldown: 1,
  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`🏓 | Latency info`)
          .setColor(
            `${
              interaction.client.ws.ping > 300
                ? interaction.client.ws.ping > 1000
                  ? "Red"
                  : "Yellow"
                : "Green"
            }`,
          )
          .setDescription(`Websocket ping: ${interaction.client.ws.ping}ms`),
      ],
    });
  },
};