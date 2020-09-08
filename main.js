const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!')
});

client.login('NzUyNjMyNDgzMDM1NDgwMjI0.X1adnw.Svr759s0nffqRMPDZwUG_NuBq1c');

client.on('message', message => {
    if (message.content === '?solus' || message.content === '?info') {

		message.channel.send('`SolusMC is a Cracked Minecraft server founded by @KhosrawAzizi#5634 and it was released for the first time on August 25, 2020. Ever since, our server\'s player base is intermittently growing since it\'s first released, users around all over the world playing our amazing gamemodes and enjoying their time here with our beloved community. Can\'t wait to play? Join the community today!`');

    } else if (message.content === '?ip') { /** Condition for IP Command */

        message.channel.send('`play.solusmc.net`');

    } else if (message.content === '?forums') { /** Condition for Forums Link Command */

        message.channel.send('https://solusmc.net/forums');

    } else if (message.content === '?website') { /** Condition for Website Link Command */

        message.channel.send('https://www.solusmc.net/');

    } else if (message.content === '?discord') { /** Condition for Discord Invite Link Command */

        message.channel.send('`invite.gg/solusmc`');

    } else if (message.content === '?apply') { /** Condition for Application Info Command */

        message.channel.send('Please see https://www.solusmc.net/forums/forum/view/17-applications-and-appeals/ for more information regarding applying for staff, builder, or YouTuber, and appealing a ban or blacklist. Please read the guidelines and requirements before you apply!');

    } else if (message.content === '?staff') { /** Condition for Staff Roles Command */

        message.channel.send('`Owner, Admin, Senior Mod, Moderator, Trainee`');

    } else if (message.content === '?smod') { // Condition for SMods List Command

        message.channel.send('`Tact, HurtCry`');

    } else if (message.content === '?admin') { // Condition for Admin List Command

        message.channel.send('`georgieHH`');

    } else if (message.content === '?help') { // Condition for Bot Help Command

        message.channel.send('`?help -> All Commands With Description\n?ip -> Server IP Address\n?forums -> Forums Link\n?website -> Website Link\n?apply -> Application Info\n?staff -> All Staff Ranks`');

    } else if (message.content === '?owner') { // Condition for Owner Name Command

        message.channel.send('`The owner of this server is Khosraw Azizi. He a cutie! <3`');

        // Miscellaneous Command Conditions
    } else if (message.content === 'bot' || message.content == 'Bot') {

        message.channel.send('`Who you callin\' a bot?`');

    } else if (message.content === 'I am sad' || message.content == 'im sad' || message.content === 'I am sad.' || message.content === 'I am sad!' || message.content === 'big sad') {

        message.channel.send('`I am sad too! :(`');

    } else if (message.content === 'Happy now?') {

        message.channel.send('`Thanks cutie! I am happy now!`');

    } else if (message.content === 'idk' || message.content === 'IDK' || message.content === 'idek' || message.content === 'IDEK' || message.content === 'idrk' || message.content === 'IDRK' || message.content === 'i dont know' || message.content === 'I don\'t know' || message.content === 'I don\'t know!') {

        message.channel.send('¯\\_(ツ)_/¯');

    } else if (message.content === ': (' || message.content === ':frowning:') {

        message.channel.send(':(');

    }

});
