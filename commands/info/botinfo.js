const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
  name: 'botinfo',
  aliases: ['stats'],
  description: 'Displays information about the bot',
  execute(message, args, client) {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setThumbnail(client.user.avatarURL({ size: 2048 }))
      .setTitle("Bot Information")
      .addField("Bot Name", client.user.username, true)
      .addField("Created On", moment(client.user.createdAt).format('MMMM Do YYYY, h:mm:ss a'), true)
      .addField("Uptime", duration, true)
      .addField("Guilds", client.guilds.cache.size, true)
      .addField("Channels", client.channels.cache.size, true)
      .addField("Users", client.users.cache.size, true)
      .addField("Library", "Discord.js", true)
      .addField("Library Version", Discord.version, true)
      .addField("Node", process.version, true)
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};