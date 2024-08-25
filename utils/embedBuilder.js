const Discord = require('discord.js');

module.exports = {
  createEmbed: function(title, description, color) {
    return new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setTimestamp();
  }
};