const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const cron = require('cron');

const updateRolesCron = new cron.CronJob('0 */1 * * *', async () => {
    console.log(`[${new Date().toLocaleString()}] Starting Update Roles`);
    const g = await bot.guilds.fetch('455443542358360064');
    const roles = await g.roles.fetch();
    const patreonSupporter = roles.cache.find(role => role.name === 'Patreon Supporter');
    const patreonAdFree = roles.cache.find(role => role.name === 'Patreon Ad-Free');
    const patreonAlliance = roles.cache.find(role => role.name === 'Patreon Alliance');
    const patreonClusterSmall = roles.cache.find(role => role.name === 'Patreon Cluster Small');
    const patreonClusterLarge = roles.cache.find(role => role.name === 'Patreon Cluster Large');
    const members = await g.members.fetch();
    const patreonSupporterMembers = members.filter(member => member.roles.cache.find(role => role === patreonSupporter)).map(member => ({memberId: member.user.id, tag: member.user.tag}));
    const patreonAdFreeMembers = members.filter(member => member.roles.cache.find(role => role === patreonAdFree)).map(member => ({memberId: member.user.id, tag: member.user.tag}));
    const patreonAllianceMembers = members.filter(member => member.roles.cache.find(role => role === patreonAlliance)).map(member => ({memberId: member.user.id, tag: member.user.tag}));
    const patreonClusterSmallMembers = members.filter(member => member.roles.cache.find(role => role === patreonClusterSmall)).map(member => ({memberId: member.user.id, tag: member.user.tag}));
    const patreonClusterLargeMembers = members.filter(member => member.roles.cache.find(role => role === patreonClusterLarge)).map(member => ({memberId: member.user.id, tag: member.user.tag}));
    const postBody = {
        url: `${baseUrl}/updateRoles`,
        body: JSON.stringify([
            {'role': patreonSupporter.name, 'members': patreonSupporterMembers},
            {'role': patreonAdFree.name, 'members': patreonAdFreeMembers},
            {'role': patreonAlliance.name, 'members': patreonAllianceMembers},
            {'role': patreonClusterSmall.name, 'members': patreonClusterSmallMembers},
            {'role': patreonClusterLarge.name, 'members': patreonClusterLargeMembers}
        ]),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    request.post(postBody, (e, response, body) => {
        if (response.statusCode === 200) {
            const patreonCaptain = roles.cache.find(role => role.name === 'Patreon Captain');
            const captains = JSON.parse(body);
            members.filter(member => member.roles.cache.find(role => role === patreonCaptain)).forEach(member => {
                if (captains.indexOf(member.id) === -1) {
                    console.log(`[${new Date().toLocaleString()}] Removing Patreon Captain role from ${member.user.tag}`);
                    member.roles.remove(patreonCaptain);
                }
            });
            captains.forEach(async memberId => {
                const member = members.find(m => m.id === memberId);
                if (member) {
                    console.log(`[${new Date().toLocaleString()}] Add Patreon Captain role to ${member.user.tag}`);
                    member.roles.add(patreonCaptain);
                }
            });
        } else {
            console.log(response.statusCode, body)
        }
    })
});

const changeAllRestUuidCron = new cron.CronJob('0 6 1 * *', () => {
    // Runs at 6AM on the first of every month
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

bot.login(process.env.BOT_TOKEN);
const baseUrl = process.env.baseUrl;

bot.once("ready", async function() {
    console.log(`Ready as: ${bot.user.tag}`);
    changeAllRestUuidCron.start();
    updateRolesCron.start();
});

bot.on('message', message => {
    if (message.content.charAt(0) === '~') {
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
