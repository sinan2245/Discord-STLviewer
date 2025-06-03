const {
    InteractionType
} = require("discord.js");
var StlThumbnailer = require('node-stl-to-thumbnail');
var fs = require('fs');
const request = require('request');
const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    AttachmentBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (message.attachments.size > 0) {
            if (message.attachments.first().name.endsWith(".stl") || message.attachments.first().name.endsWith(".STL")) {
                if (message.attachments.first().size > 10.5e+6) return message.react("❌")
                const firstmsg = await message.channel.send("Votre modèle à été placé dans la file d'attente, il sera traité dès que les autres fichiers sont traités.");
                request(message.attachments.first().url)
                    .pipe(fs.createWriteStream(`./${message.id}.stl`)
                        .on('finish', () => {
                            //delete firstmsg;
                            firstmsg.delete();
                            let msgdesc;
                            if (message.attachments.first().size > 2e+6){
                                msgdesc = ":warning: **Ce fichier est volumineux, il peut prendre un certain temps de génération.**";
                            } else {
                                msgdesc = "**Si votre fichier est volumineux et que d'autres fichiers sont en cours de traitements, cela peut prendre __plusieurs minutes__**"
                            }
                            const loadingscreen = new EmbedBuilder()
                                .setTitle("Visualiseur STL")
                                .setColor(0xc573be)
                                .setDescription("[**Votre stl visualisé en une minute !**](https://www.youtube.com/c/lesfrerespoulain)\n\n"+ msgdesc)
                                .setFooter({
                                    text: "Made with ❤ by Sinan2245#0001",
                                })
                            const filename = message.attachments.first().name;
                            message.channel.send({
                                embeds: [loadingscreen]
                            }).then(msg => {
                                var thumbnailer = new StlThumbnailer({
                                        filePath: `./${message.id}.stl`,
                                        requestThumbnails: [{
                                            width: 300,
                                            height: 300,
                                            baseOpacity: 2,
                                            baseColor: 0x246467,
                                            shadeNormalsOpacity: 0, 

                                        }]
                                    })
                                    .then(function (thumbnails) {

                                        thumbnails[0].toBuffer(function (err, buf) {
                                            fs.writeFileSync(`./data/${message.id}.jpg`, buf)
                                        })
                                    })

                                var thumbnailer2 = new StlThumbnailer({
                                        filePath: `./${message.id}.stl`,
                                        requestThumbnails: [{
                                            width: 300,
                                            height: 300,
                                            cameraAngle: [100, 300, 100],
                                            baseOpacity: 2,
                                            baseColor: 0x246467,
                                            shadeNormalsOpacity: 0, 
                                        }]
                                    })
                                    .then(function (thumbnails) {
                                        st2 = true
                                        thumbnails[0].toBuffer(function (err, buf) {
                                            fs.writeFileSync(`./data/${message.id}2.jpg`, buf)
                                        })
                                    })

                                var thumbnailer3 = new StlThumbnailer({
                                        filePath: `./${message.id}.stl`,
                                        requestThumbnails: [

                                            {
                                                width: 300,
                                                height: 300,
                                                cameraAngle: [200, 10, 50],
                                                baseOpacity: 2,
                                                baseColor: 0x246467,
                                                shadeNormalsOpacity: 0, 
                                                

                                            }
                                        ]
                                    })
                                    .then(function (thumbnails) {
                                        st3 = true
                                        thumbnails[0].toBuffer(function (err, buf) {
                                            fs.writeFileSync(`./data/${message.id}3.jpg`, buf)
                                        })
                                    })

                                const row = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                        .setCustomId(`button_${message.id}2.jpg`)
                                        .setLabel("Angle 2")
                                        .setStyle(ButtonStyle.Primary),
                                        new ButtonBuilder()
                                        .setCustomId(`button_${message.id}3.jpg`)
                                        .setLabel('Angle 3')
                                        .setStyle(ButtonStyle.Primary),
     
                                    );
                                const file = new AttachmentBuilder('./data/' + message.id + '.jpg');
                                const exampleEmbed = new EmbedBuilder()
                                    .setTitle('Visualiseur STL')
                                    .setDescription("[**Votre stl visualisé en une minute !**](https://www.youtube.com/c/lesfrerespoulain)\n**Envoyé par: **" + message.author.tag + "\n**Nom du fichier: **" + message.attachments.first().name)
                                    .setFooter({
                                        text: "Cliquez sur les boutons pour voir le STL sous un autre angle",
                                    })
                                    .setColor(0xc573be)
                                    .setImage(`attachment://${message.id}.jpg`);
                                const interval = setInterval(() => {
                                    if (
                                        fs.existsSync(`./data/${message.id}.jpg`) &&
                                        fs.existsSync(`./data/${message.id}2.jpg`) &&
                                        fs.existsSync(`./data/${message.id}3.jpg`)
                                    ) {
                                        clearInterval(interval);
                                        msg
                                            .edit({
                                                content: null,
                                                files: [`./data/${message.id}.jpg`],
                                                components: [row],
                                                embeds: [exampleEmbed],
                                            })
                                            .then(() => {
                                                fs.unlinkSync(`./${message.id}.stl`);
                                                fs.unlinkSync(`./data/${message.id}.jpg`);
                                                fs.unlinkSync(`./data/${message.id}2.jpg`);
                                                fs.unlinkSync(`./data/${message.id}3.jpg`);
                                            });
                                    }
                                }, 2000);
                            })

                        })



                    )

            }
        }

    }
}
