const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  description: 'Displays information about the server',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setThumbnail(message.guild.iconURL({ size: 2048 }))
      .setAuthor(message.guild.name, message.guild.iconURL())
      .addField("ID", message.guild.id, true)
      .addField("Owner", message.guild.owner.user.tag, true)
      .addField("Region", message.guild.region, true)
      .addField("Total | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
      .addField("Channels", message.guild.channels.cache.size, true)
      .addField("Roles", message.guild.roles.cache.size, true)
      .addField("Creation Date", moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm:ss a'), true)
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};