const Discord = require('discord.js');
const bot = new Discord.Client();
const Request = require('request');

bot.login(process.env.BOT_TOKEN);

bot.on("ready", function() {
    console.log(`Ready as: ${bot.user.tag}`);
});

bot.on('message', message => {
    if (message.content.charAt(0) === '~') {
        message.channel.send({
            "embed": {
                "url": "http://discord.gg/",
                "description":"Commands need to be run in <#473602765755645957>",
                "title":"Wrong Channel",
                "thumbnail":
                {
                    "url":"https://images-ext-1.discordapp.net/external/M_1WSrQXhqBECS5CZwX8E_zTp95DXBadhlVZdvsSz2A/https/msf.gg/exclamation-triangle-solid.png"
                },
                "color":14733329,
                "footer":
                {
                    "icon_url":"https://media.discordapp.net/attachments/473602765755645957/745114506362880000/unknown.png",
                    "text":"MSF.gg Bot • https://msf.gg/bot • tyejae#2513"
                }
            }
        });
    }
});