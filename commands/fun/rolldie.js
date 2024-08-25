const Discord = require('discord.js');

module.exports = {
  name: 'rolldie',
  aliases: ['rd', 'die', 'rolladie'],
  description: 'Rolls a die',
  execute(message, args) {
    const result = Math.floor(Math.random() * 6) + 1;
    const embed = new Discord.MessageEmbed()
      .setTitle('You rolled a')
      .setDescription(`${result}!`)
      .setColor('00aa77');
    message.channel.send(embed);
  },
};