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
    // Création de l'embed d'erreur pour les permissions insuffisantes
    const notpermEmbed = new EmbedBuilder()
        .setTitle("Permission insuffisante")
        .setDescription("Vous n'avez pas la permission d'utiliser cette commande")
        .setColor(0xff0000)
        .setFooter({
            text: "Made with ❤ by Sinan2245#0001"        
        })

    // Récupération du membre qui a exécuté la commande
    const member = await interaction.guild.members.fetch(interaction.user.id);

    // Si le membre n'a pas la permission de bannir des membres, on envoie l'embed d'erreur
    if(!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({
        embeds: [notpermEmbed],
        ephemeral: true
      });
    }

    // Importation des modules 'fs' et 'path'
    const fs = require('fs');
    const path = require('path');

    // Suppression de tous les fichiers dans le dossier 'data'
    fs.readdir('./data', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('./data', file), err => {
          if (err) throw err;
          console.log(
