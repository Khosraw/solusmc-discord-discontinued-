# test
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!')
});

client.login('NzUyNjMyNDgzMDM1NDgwMjI0.X1adnw.Svr759s0nffqRMPDZwUG_NuBq1c');

client.on('message', message => {
    if (message.content === '?solus' || message.content === '?info') {

	message.channel.send('`SolusMC is a Cracked Minecraft server founded by @KhosrawAzizi#5634 and it was released for the first time on August 25, 2020. Ever since, our server\'s player base is intermittently growing since it\'s first released, users around all over the world playing our amazing gamemodes and enjoying their time here with our beloved community. Can\'t wait to play? Join the community today!`');

    } else if (message.content === '?ip') { /** Condition for Information Command */

        message.channel.send('`play.solusmc.net`');

    } else if (message.content === '?rules') { /** Condition for IP Command */

        message.channel.send('Please read the Discord rules at #rules. Server/Network Rules are located at https://www.solusmc.net/forums/forum/topic/9-network-rules');

    } else if (message.content === '?forums') { /** Condition for Forums Link Command */

        message.channel.send('https://solusmc.net/forums');

    } else if (message.content === '?website') { /** Condition for Website Link Command */

        message.channel.send('https://www.solusmc.net/');

    } else if (message.content === '?discord' || message.content === '?invite') { /** Condition for Discord Invite Link Command */

        message.channel.send('https://invite.gg/solusmc\nhttps://discord.gg/vVbx9YU');
	    
    } else if (message.content === '?store') { /** Condition for Store Link Command */

        message.channel.send('`Please consider making a donation at https://store.solusmc.net!`');

    } else if (message.content === '?apply') { /** Condition for Application Info Command */

        message.channel.send('Please see https://www.solusmc.net/forums/forum/view/17-applications-and-appeals/ for more information regarding applying for staff, builder, and appealing a ban or blacklist. Please read the guidelines and requirements before you apply!');

    } else if (message.content === '?staff') { /** Condition for Staff Roles Command */

        message.channel.send('https://www.solusmc.net/staff.html');

    } else if (message.content === '?help') { // Condition for Bot Help Command

        message.channel.send('`?help -> All Commands With Description\n\n?info -> Server Information\n?ip -> Server IP Address\n?rules -> Rules for the server and Discord\n?forums -> Forums Link\n?website -> Website Link\n?discord/?invite -> Discord Invite Link\n?store -> Server Store for buying Ranks and upgrades\n?apply -> Application Info\n?staff -> Link to Staff Page\n?vote -> Link to Voting Links`');

    } else if (message.content === '?vote') { /** Condition for Vote Link Command */

        message.channel.send('`Please consider supporting the server at the links at https://www.solusmc.net/vote.html. It helps out a ton if you vote!`');
	    
    } else if (message.content === '?owner') { // Condition for Owner Name Command

        message.channel.send('`The owner of this server is Khosraw Azizi. He a cutie! <3`');

        // Miscellaneous Command Conditions
    } else if (message.content === 'bot' || message.content == 'Bot') {

        message.channel.send('`Who you callin\' a bot?`');

    } else if (message.content === 'Happy now?') {

        message.channel.send('`Thanks! I am happy now!`');
	    
    } else if (message.content === ':(') {

        message.channel.send('`Cheer up buddy!`');

    }

});
