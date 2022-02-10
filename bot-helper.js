const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const cron = require('cron');

const changeAllRestUuidCron = new cron.CronJob('0 6 6 * *', () => {
    // Runs at 6AM on the sixth of every month
    const postBody = {
        url: `${baseUrl}/updateRestUuids`,
        body: '',
        headers: {
            'Content-Type': 'application/json',
        },
    }; 
    request.post(postBody, (e, response, body) => {
        if (response.statusCode === 200) {
            console.log(body); 
        } else {
            console.log(response.statusCode, body) 
        }
    })
})

bot.login('NzQ1MzcwMDcwNzIwNDQ2NjI1.Xzwx-Q.0SnG6RfmxxYxzF0bRh4p7Zsr3SY');
const baseUrl = 'https://api.tyejae.com/services/msfggbot';
console.time('Startup');
bot.once("ready", async function() {
    console.log(`Ready as: ${bot.user.tag}`);
    changeAllRestUuidCron.start();
    console.timeEnd('Startup');
});

bot.on('message', message => {
    if (message.content.charAt(0) === '-' && message.content.length > 1 && message.content.charAt(1) !== '-') {
        message.delete({timeout: 1000}).catch();
        let description = '';
        let title = '';
        if (message.channel.id === '697913862095241296') { // #bot-testing
            description = `The prefix for this server is \`~\`. Try your command again using \`~${message.content.substring(1)}\`.`;
            title = 'Wrong Prefix';
            if (message.channel.id === '744913491999064294') {
                description = `El prefijo para este servidor es \`~\`. Pruebe su comando de nuevo usando \`~${message.content.substring(1)}\`.`;
                title = 'Prefijo Incorrecto';
            }
            if (message.channel.id === '725423289903611904') {
                description = `Le préfixe de ce serveur est \`~\`. Essayez à nouveau votre commande en utilisant \`~${message.content.substring(1)}\`.`;
                title = 'Mauvais Préfixe';
            }
        } else {
            description = `Commands need to be run in <#697913862095241296> and the prefix for this server is \`~\`. Try your command again using \`~${message.content.substring(1)}\` in <#697913862095241296>.`;
            title = 'Wrong Prefix & Channel';
            if (message.channel.id === '744913491999064294') {
                description = `Los comandos deben ejecutarse en <#697913862095241296> y el prefijo para este servidor es \`~\`. Pruebe su comando de nuevo usando \`~${message.content.substring(1)}\` en <#697913862095241296>.`;
                title = 'Prefijo y Canal Incorrectos';
            }
            if (message.channel.id === '725423289903611904') {
                description = `Les commandes doivent être exécutées dans <#697913862095241296> et le préfixe de ce serveur est \`~\`. Essayez à nouveau votre commande en utilisant \`~${message.content.substring(1)}\` dans <#697913862095241296>.`;
                title = 'Mauvais Préfixe et Canal';
            }
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
        }).then(r => r.delete({timeout: 30000, reason: 'because'})).catch();
    } else if (message.content.charAt(0) === '~' && message.channel.id !== '697913862095241296') { // #bot-testing
        message.delete({timeout: 1000}).catch();
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
        }).then(r => r.delete({timeout: 30000, reason: 'because'})).catch();
    }
});
