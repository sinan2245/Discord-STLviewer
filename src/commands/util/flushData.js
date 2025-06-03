const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flush_data')
    .setDescription('Supprime tous les rendus du bot'),
  async execute(interaction) {
    const notpermEmbed = new EmbedBuilder()
      .setTitle('Permission insuffisante')
      .setDescription("Vous n'avez pas la permission d'utiliser cette commande")
      .setColor(0xff0000)
      .setFooter({ text: 'Made with ❤ by Sinan2245#0001' });

    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ embeds: [notpermEmbed], ephemeral: true });
    }

    const dataDir = './data';
    if (!fs.existsSync(dataDir)) {
      return interaction.reply({
        content: "Aucun rendu n'a été trouvé.",
        ephemeral: true,
      });
    }

    try {
      const files = await fs.promises.readdir(dataDir);
      await Promise.all(
        files.map((file) => fs.promises.unlink(path.join(dataDir, file)))
      );
      await interaction.reply({
        content: 'Tous les rendus ont été supprimés.',
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Une erreur est survenue lors de la suppression des fichiers.',
        ephemeral: true,
      });
    }
  },
};
