module.exports = {
  name: 'unmute',
  description: 'Unmute a member',
  execute(message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) 
      return message.reply("You don't have permission to do this.");

    let user = message.mentions.members.first();
    if (!user) 
      return message.reply("Please mention the user to unmute.");

    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");

    if (!user.roles.cache.has(muteRole.id)) 
      return message.reply("This user is not muted!");

    user.roles.remove(muteRole.id);
    message.reply(`<@${user.id}> has been unmuted.`);
  },
};