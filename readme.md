# 🚀 Visualiseur de STL pour Discord

Ce **bot Discord** vous permet de visualiser des fichiers STL directement dans votre serveur. Il suffit de téléverser un fichier STL dans un salon et le bot enverra un aperçu du modèle.

## 🔧 Comment utiliser le bot

Uploader simplement un fichier STL et le bot vous donnera un apercu du fichier.

## 🚫 Commande de suppression des données

Pour supprimer tous les rendus d'aperçus stockés, utilisez la commande `/flush_data`. Cette commande est réservée aux personnes ayant le statut d'administrateur.

> **Attention**: cette commande supprimera définitivement tous les rendus d'aperçus stockés, il n'y a pas de moyen de les récupérer.

## ⚠️ Remarques

- Le bot ne prend en charge que les fichiers STL de moins de 10 Mo pour des raisons de performance.
- Si vous rencontrez des problèmes ou avez des suggestions pour améliorer le bot, n'hésitez pas à ouvrir une issue sur le dépôt GitHub du projet.
- Si le fichier est volumineux, cela peut prendre un peu de temps selon la machine qui l'héberge.
- Le bot n'est pas fait pour du **multi-serveur**, utilisez le uniquement sur votre propre serveur sinon tout le monde pourra supprimer les rendus.

## 💻 Installation 

Pour utiliser ce bot Discord, vous avez besoin d'installer [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/) (qui est inclus avec Node.js).

1. Téléchargez et installez Node.js et npm sur votre ordinateur.
2. Créez un bot en suivant les instructions [ici](https://discordjs.guide/preparations/setting-up-a-bot-application.html). 🤖
3. Clonez ce dépôt Git sur votre ordinateur : `git clone https://github.com/[nom d'utilisateur]/visualiseur-stl-discord.git`
4. Accédez au répertoire du projet.
5. Installez les dépendances du projet en utilisant la commande `npm install`
6. Créez un fichier `.env` à la racine du projet et ajoutez votre jeton de bot comme ceci : `token=votre token de bot`
7. Lancez le bot en utilisant la commande `node index.js` 🚀

Le bot devrait maintenant être en ligne sur votre serveur Discord. Vous pouvez maintenant téléverser des fichiers STL pour obtenir un aperçu. 📈

> **Note**: Assurez-vous de ne pas partager votre token avec qui que ce soit, car il permet de contrôler votre bot Discord. ⚠️


## Images : 
![Image](https://cdn.discordapp.com/attachments/878253378575151144/1054524525406081145/image.png)

> *Si vous avez le moindre soucis, n'hésitez pas à m'en faire part en ouvrant une issue ou en me contactant sur Discord `Sinan2245#8683`*
