const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!')
});

client.login('NzUyNjMyNDgzMDM1NDgwMjI0.X1adnw.Svr759s0nffqRMPDZwUG_NuBq1c');

client.on('message', message => {
    if (message.content === '?ip') {

        message.channel.send('`play.solusmc.net`');

    } else if (message.content === '?forums') {

        message.channel.send('https://solusmc.net/forums');

    } else if (message.content === '?website') {

        message.channel.send('https://www.solusmc.net/');

    } else if (message.content === '?discord') {

        message.channel.send('`invite.gg/solusmc`');

    } else if (message.content === '?apply') {

        message.channel.send('Please see https://www.solusmc.net/forums/forum/view/17-applications-and-appeals/ for more information regarding applying for staff, builder, or YouTuber, and appealing a ban or blacklist. Please read the guidelines and requirements before you apply!');

    } else if (message.content === '?staff') {

        message.channel.send('`Owner, Admin, Senior Mod, Moderator, Trainee`');

    } else if (message.content === '?help') {

        message.channel.send('`?forums -> Forums Link\n?website -> Website Link`');

    } else if (message.content === '?owner') {

        message.channel.send('`The owner of this server is Khosraw Azizi. He a cutie! <3`');

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
