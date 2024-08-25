const Discord = require('discord.js');

module.exports = {
  name: 'coinflip',
  aliases: ['ht'],
  description: 'Flips a coin',
  execute(message, args) {
    const result = Math.random() < 0.5 ? 'HEADS!' : 'TAILS!';
    const embed = new Discord.MessageEmbed()
      .setTitle('Here is the winner!')
      .setDescription(result)
      .setColor('00aa77');
    message.channel.send(embed);
  },
};