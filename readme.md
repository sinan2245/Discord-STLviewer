# STL Visualisor for LFP


Documentation d'installation du bot




## Examples :
**`Debian 10/11`**
- `apt update && apt upgrade`
- `curl -s https://deb.nodesource.com/setup_16.x | sudo bash`
- Modifier les informations du code à l'aide d'un éditeur de texte (Token du bot + informations dans handlers/handleCommands.js)
- Utiliser **Filezilla** pour transférer le code du bot en SFTP
- `apt install screen`
- `screen -S lfp`
- Se rendre dans le dossier du bot (`ls` pour **lister le dossiers** + cd Nom du Dossier pour **aller** dans le dossier du bot)
- `npm i`
- `node src/bot.js` **Attention** de bien activer les intents sur le portail développeur

__Commandes de base du paquet screen__
*Ce paquet permet de faire tourner du code sans avoir besoin d'avoir une session connecté, sinon dès que vous vous déconnecter en SSH, le code ne tournera plus*
- `screen -S lfp` - *Crée un screen du nom de lfp*
- CTRL + A + D - Quitte le screen sur lequel vous êtes (en le laissant tourner)
- `screen -R lfp` - Vous remet sur le screen du bot, ce qui vous permettra de voir ce qu'il y a dans la console où d'arrêter le bot en faisant CTRL + C 
- `pkill screen` - Supprime tout les screens en cours (donc arrête le bot)



