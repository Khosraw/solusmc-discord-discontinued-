const Discord = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a member from the server',
  execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) 
      return message.reply('You do not have the permission to ban users!');

    if (!message.guild.me.hasPermission('BAN_MEMBERS')) 
      return message.reply('I do not have the permission to ban users!');

    let user = message.mentions.users.first();
    if (!user) 
      return message.reply('Please mention the user to ban.');

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";

    let member = message.guild.member(user);
    if (!member) 
      return message.reply("That user isn't in this guild!");

    member.ban({ reason: reason }).then(() => {
      const embed = new Discord.MessageEmbed()
        .setTitle('**Confirmed**')
        .setDescription(`**Success**\nUser has successfully been banned from the server.`)
        .setColor("GREEN")
        .setFooter(`SolusMC`, user.avatarURL({ dynamic: true }))
        .setTimestamp();
      message.channel.send(embed);
    }).catch(err => {
      message.reply('I was unable to ban the member');
      console.error(err);
    });
  },
};