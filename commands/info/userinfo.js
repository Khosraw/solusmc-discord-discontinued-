const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['user', 'whois'],
  description: 'Displays information about a user',
  execute(message, args) {
    let user = message.mentions.users.first() || message.author;
    let member = message.guild.member(user);

    let status;
    switch (user.presence.status) {
      case "online":
        status = "Online";
        break;
      case "dnd":
        status = "Do Not Disturb";
        break;
      case "idle":
        status = "Idle";
        break;
      case "offline":
        status = "Offline";
        break;
    }

    const embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setThumbnail(user.avatarURL({ dynamic: true, size: 2048 }))
      .addField("User", `${user.tag}`, true)
      .addField("ID", `${user.id}`, true)
      .addField("Status", status, true)
      .addField("Account Created", moment(user.createdAt).format('LLLL'), true)
      .addField("Joined Server", moment(member.joinedAt).format('LLLL'), true)
      .addField("Roles", member.roles.cache.map(role => role.toString()).join(" ,"), true)
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp()

    message.channel.send(embed);
  },
};