const Discord = require('discord.js');
const bot = new Discord.Client();
const Request = require('request');

bot.login(process.env.BOT_TOKEN);

bot.on("ready", function() {
    console.log(`Ready as: ${bot.user.tag}`);
});

bot.on('message', message => {
    if (message.content.charAt(0) === '~') {
        message.delete(1000).catch();
        let description = "Commands need to be run in <#697913862095241296>";
        let title = "Wrong Channel";
        if (message.channel.id === '744913491999064294') {
            description = "Los comandos deben ejecutarse en <#697913862095241296>";
            title = "Canal Equivocado";
        }
        if (message.channel.id === '725423289903611904') {
            description = "Les commandes doivent être exécutées dans <#697913862095241296>";
            title = "Mauvaise Chaîne";
        }
        return message.reply({
            "embed": {
                "url": "http://discord.gg/",
                "description": description,
                "title": title,
                "thumbnail":
                {
                    "url":"https://msf.gg/exclamation-triangle-solid.png"
                },
                "color":14733329,
                "footer":
                {
                    "icon_url":"https://msf.gg/msfgg-bot-36x36.png",
                    "text":"MSF.gg Bot • https://msf.gg/bot • tyejae#2513"
                }
            }
        }).then(r => r.delete(30000)).catch();
    }
});
