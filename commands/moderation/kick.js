module.exports = {
  name: 'kick',
  description: 'Kick a member from the server',
  execute(message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) 
      return message.reply("You don't have permission to do this.");
    
    let user = message.mentions.users.first();
    if (!user) 
      return message.reply("Please mention the user to kick.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";

    let member = message.guild.member(user);
    if (!member) 
      return message.reply("That user isn't in this guild!");

    member.kick(reason).then(() => {
      message.reply(`Successfully kicked ${user.tag}`);
    }).catch(err => {
      message.reply('I was unable to kick the member');
      console.error(err);
    });
  },
};