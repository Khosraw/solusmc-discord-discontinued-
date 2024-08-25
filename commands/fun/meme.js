const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'meme',
  aliases: ['memes'],
  description: 'Sends a random meme',
  async execute(message, args) {
    const response = await fetch('https://www.reddit.com/r/meme/random/.json');
    const content = await response.json();
    const image = content[0].data.children[0].data.url;
    const embed = new Discord.MessageEmbed()
      .setImage(image)
      .setTimestamp()
      .setFooter('from: r/meme');
    message.channel.send(embed);
  },
};