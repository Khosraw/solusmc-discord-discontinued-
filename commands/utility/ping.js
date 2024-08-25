const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Ping!',
  async execute(message, args) {
    const m = await message.channel.send("Pinging...");
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField("⌛ Latency", `**${m.createdTimestamp - message.createdTimestamp}ms**`)
      .addField("💓 API", `**${Math.round(message.client.ws.ping)}ms**`);
    m.edit(`🏓 Pong!`, embed);
  },
};