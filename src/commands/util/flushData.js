const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder,
    ActionRowBuilder,
    PermissionsBitField,
    SelectMenuOptionBuilder,
    SelectMenuBuilder
  } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flush_data")
    .setDescription("Supprime tout les rendus du bot"),
  async execute(interaction, client) {
    const notpermEmbed = new EmbedBuilder()
        .setTitle("Permission insuffisante")
        .setDescription("Vous n'avez pas la permission d'utiliser cette commande")
        .setColor(0xff0000)
        .setFooter({
            text: "Made with ❤ by Sinan2245#0001"        
        })

        const member = await interaction.guild.members.fetch(interaction.user.id);
        if(!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                embeds: [notpermEmbed],
                ephemeral: true
            });
        }

        const fs = require('fs');
        const path = require('path');

        //delete all files in data folder
        fs.readdir('./data', (err, files) => {
            if (err) throw err;

            for (const file of files) {
              fs.unlink(path.join('./data', file), err => {
                if (err) throw err;
                console.log(`${file} was deleted`);
              });
            }
          });
          interaction.reply({
            content: "Tout les rendus ont été supprimés",
            ephemeral: true
          })
  },
};