module.exports = {
  name: 'stop',
  description: 'Stop all songs in the queue!',
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could stop!");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  },
};