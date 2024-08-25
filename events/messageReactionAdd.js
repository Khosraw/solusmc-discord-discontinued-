module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    if (reaction.message.channel.id === '734914063154413620') {
      if (reaction.emoji.name === '📢') {
        await reaction.message.guild.members.cache.get(user.id).roles.add('758829094589956136');
      } else if (reaction.emoji.name === '🥇') {
        await reaction.message.guild.members.cache.get(user.id).roles.add('758828199773208577');
      }
    }
  },
};