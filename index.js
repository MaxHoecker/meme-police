require('dotenv').config();
const Discord = require('discord.js');
let memeCreator = require('meme-creator');

const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(msg.channel.name === 'general' && !msg.author.bot){
        let pfpUrl = msg.author.displayAvatarURL({size: 512}).replace("webp", "png");

        msg.delete();

        let options = {};

        if(msg.content.length > 70){
            options = {
                imageURL: pfpUrl, // URL to image
                topText: 'Ur message is too long', // top text of meme
                bottomText: 'bottom text', // bottom text of meme
                directory: './images/', // where to save memes
                fileName: 'random', // change to 'random' for a random file name
            };
        }
        else {
            let message = msg.content;
            // let halfwayIndex = msg.content.indexOf(' ', Math.floor(msg.content.length / 2));
            //
            // let topText = message.substring(0, halfwayIndex);
            // let bottomText = message.substring(halfwayIndex);

            options = {
                imageURL: pfpUrl, // URL to image
                topText: msg.content, // top text of meme
                bottomText: 'bottom text', // bottom text of meme
                directory: './images/', // where to save memes
                fileName: 'random', // change to 'random' for a random file name
            };
        }


        memeCreator(options, function(res, error) {
            if(error) console.error(error);
            const attachment = new Discord.MessageAttachment(res.fileName);
            msg.channel.send(attachment);
        });
    }
});

