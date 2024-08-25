const ms = require('ms');

module.exports = {
  name: 'mute',
  description: 'Mute a member',
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) 
      return message.reply("You don't have permission to do this.");

    let user = message.mentions.members.first();
    if (!user) 
      return message.reply("Please mention the user to mute.");

    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          data: {
            name: "Muted",
            color: "#000000",
            permissions: []
          }
        });
        message.guild.channels.cache.forEach(async (channel) => {
          await channel.updateOverwrite(muteRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false
          });
        });
      } catch(e) {
        console.log(e.stack);
      }
    }

    let mutetime = args[1];
    if (!mutetime) {
      await user.roles.add(muteRole.id);
      message.reply(`<@${user.id}> has been muted`);
    } else {
      await user.roles.add(muteRole.id);
      message.reply(`<@${user.id}> has been muted for ${ms(ms(mutetime))}`);

      setTimeout(function(){
        user.roles.remove(muteRole.id);
        message.channel.send(`<@${user.id}> has been unmuted`);
      }, ms(mutetime));
    }
  },
};