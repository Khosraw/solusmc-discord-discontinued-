const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
// What is partials?
// Partials allow you to receive events that contains uncached instances.
// When you restart your bot, any cache will be lost, and you wouldn't be able to get the previous content (.fetch())
// We're activate this to prevent any mistakes.

let m = require('moment-duration-format'),
  os = require('os'),
  cpuStat = require('cpu-stat'),
  ms = require('ms'),
  moment = require('moment'),
  fetch = require('node-fetch'),
  parse_ms = require('parse-ms'),
  dateformat = require('dateformat');

const NovelCovid = require("novelcovid");
const covid = require('novelcovid');
 
// you can choose which URL to use, this will not change the behaviour of the API
covid.settings({
    baseUrl: 'https://corona.lmao.ninja'
})

client.mute = new Map();

const config = require('./config.json');
client.config = config;
const ytdl = require('ytdl-core');
const {
  GiveawaysManager
} = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});

let memberlog = "788114505832857620";

 client.on('guildMemberAdd', (member) => { // If a member joins
  let channelID = '788114505832857620' // #Welcome channel ID
  if (member.guild.id != '733403709416931449') return; // Server ID
  let avatar = member.user.displayAvatarURL()
  let embed = new Discord.MessageEmbed()
    .setTitle('Welcome to the server!') // Sets Title...
    .setDescription(`Welcome ${member.user} to the SolusMC Discord server!\n\nPlease read the rules channel and change your nickname to your in-game name to avoid confusion, keep in mind that rule breakers will be banned from the discord.`) // This @ts the player that joins
    .setColor("00aaff") // Sets Embed Color
    .setImage(avatar)
    .setFooter(`Joined, ${member.guild}`) // Dynamic: True just means that it can support gifs 
    .setTimestamp() // Sets Timestamp located in footer                          // To put servers Avatar use member.guild.iconURL() Also supports Dynamic
  client.channels.cache.get(channelID).send(embed) // Gets the ChannelID and then sends the message wherever the channel is located
 /* member.roles.add("733403976258551838"); // Member role.*/
});

client.on("messageReactionAdd", async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== "733403709416931449") return; // Use this if your bot was only for one server/private server.

  if (reaction.message.channel.id === "780676039596703754") { // This is a #self-roles channel.
    if (reaction.emoji.name === "✅") {
      reaction.users.remove(user);
      await reaction.message.guild.members.cache.get(user.id).roles.add("733403976258551838")
      return user.send("You have been verified!").catch(() => console.log("Failed to send DM."));
    }
  }

  if (reaction.message.channel.id === "734914063154413620") { // This is a #self-roles channel.
    if (reaction.emoji.name === "📢") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("758829094589956136")
      return user.send("Announcements role was given!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🥇") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("758828199773208577");
      return user.send("Events role was given!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🗳️") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("758828204549996564");
      return user.send("Polls role was given!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🆕") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("758828201958703205");
      return user.send("Updates role was given!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "📹") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("788840581639569418");
      return user.send("Media role was given!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🎉") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("783524398757314581");
      return user.send("Giveaway role was given!").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return; // If the channel was not a #self-roles, ignore them.
  }
})

client.on("messageReactionRemove", async (reaction, user) => {
  // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== "733403709416931449") return;

  if (reaction.message.channel.id === "734914063154413620") {
    if (reaction.emoji.name === "📢") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("758829094589956136")
      return user.send("Announcements role was taken!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🥇") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("758828199773208577")
      return user.send("Events role was taken!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🗳️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("758828204549996564")
      return user.send("Polls role was taken!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🆕") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("758828201958703205")
      return user.send("Updates role was taken!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "📹") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("788840581639569418")
      return user.send("Media role was taken!").catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🎉") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("783524398757314581")
      return user.send("Giveaway role was taken!").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return;
  }
})

require('./uptime.js')
const queue = new Map();

client.on("ready", () => {
  function randomStatus() {
    let status = ["you!", "Kho!", "Lo-Fi", "code..."] // You can change it whatever you want.
    let rstatus = Math.floor(Math.random() * status.length);

    // client.user.setActivity(status[rstatus], {type: "WATCHING"}); 
    // You can change the "WATCHING" into STREAMING, LISTENING, and PLAYING.
    // Example: streaming

    client.user.setActivity(status[rstatus], {
      type: "LISTENING",
      url: "https://open.spotify.com/playlist/0DhmM2Rre4leQVj2lhF6pd"
    });
  };
  setInterval(randomStatus, 20000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.

  console.log('Online.')
})

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
}); 

const usersMap = new Map();
const LIMIT = 5;
const TIME = 5000;
const DIFF = 2500;

client.on('message', async message => {
  if (message.author.bot) return; // Ignore if the user is a bot.

  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const {
      lastMessage,
      timer
    } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    console.log(difference);
    let msgCount = usersMap.get(message.author.id).msgCount;
    if (difference > DIFF) {
      console.log(timer);
      clearTimeout(timer);
      console.log("Cleared timeout!");
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log("Removed from reset.");
      }, TIME);
      usersMap.set(message.author.id, userData);
    } else {
      ++msgCount;
      if (parseInt(msgCount) === LIMIT) {
        const role = message.guild.roles.cache.get("735688801698971649");
        message.member.roles.add(role);
        message.channel.send("You have been muted.");
        msgCount = 0;
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  } else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log("Removed from map.");
    }, 5000);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }

  let prefix;

  prefix = "?"; // If the server doesn't have any custom prefix, return default.


  if (!message.content.startsWith(prefix)) return; // use this. so your bot will be only executed with prefix.

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1)); // Message Flags: -default, -ban, -parameter
  }

    const serverQueue = queue.get(message.guild.id);

  if (msg.startsWith(prefix + "play")) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(prefix + "skip")) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(prefix + "stop")) {
    stop(message, serverQueue);
    return;
  }
    
  if (msg.startsWith(prefix + "corona") || msg.startsWith(prefix + "coronavirus")) {
    let corona = await covid.all()
    let embed = new Discord.MessageEmbed()
      .setTitle("Global Cases")
      .setColor("#ff2050")
      .setDescription("Sometimes case numbers may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);

      return message.channel.send(embed)
    }

  if (msg.startsWith(prefix + "giveaway")) {
    await message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You are not allowed to start giveaways');

    let channel = message.mentions.channels.first();

    if (!channel) return message.channel.send('Please provide a channel');

    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Pleae provide a valid duration');

    let giveawayWinners = args[2];

    if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Please provide a valid number of winners!');

    let giveawayPrize = args.slice(3).join(" ");

    if (!giveawayPrize) return message.channel.send('Ok then, I\'ll give away nothing');

    client.giveawaysManager.start(channel, {
      time: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: giveawayWinners,
      hostedBy: client.config.hostedBy ? message.author : null,

      messages: {
        giveaway: (client.config.everyoneMention ? "<@&783524398757314581>\n\n" : ""),
        giveawayEnded: (client.config.everyoneMention ? "<@&783524398757314581>\n\n" : "") + "🎉 GIVEAWAY ENDED 🎉",
        timeRemaining: "Time remaining: **{duration}**",
        inviteToParticipate: "React with 🎉 to enter",
        winMessage: "Congrats {winners}, you won **{prize}**",
        embedFooter: "Giveaway time!",
        noWinner: "Couldn't determine a winner",
        hostedBy: "Hosted by {user}",
        winners: "winner(s)",
        endedAt: "Ends at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false
        }
      }
    })

    client.channels.cache.get(773341699065774100).send("Giveaway starting...")
  }

  if (msg.startsWith(prefix + "reroll")) {
    await message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permission to rerol giveaways');

    if (!args[0]) return message.channel.send('No giveaway ID provided');

    let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) return message.channel.send('Couldn\'t find a giveaway with that ID/name');

    client.giveawaysManager.reroll(giveaway.messageID)
      .then(() => {
        message.channel.send('Giveaway rerolled')
      })
      .catch((e) => {
        if (e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)) {
          message.channel.send('This giveaway hasn\'t ended yet')
        } else {
          console.error(e);
          message.channel.send('An error occured')
        }
      })
  }

  if (msg.startsWith(prefix + "reaction-roles-embed")) {
    await message.delete()
    let channel = client.channels.cache.get("734914063154413620"); // We want to sent the embed, directly to this channel.
    const embed = new Discord.MessageEmbed()
      .setColor(0xaaff)
      .setTitle("Self-Assigned Roles")
      .setDescription(`📢 <@&758829094589956136> - By adding this role, you will receive notifications about important announcements.\n\n🥇 <@&758828199773208577> - By adding this role, you will receive notifications about the upcoming events.\n\n🗳️ <@&758828204549996564> - By adding this role, you will receive notifications about polls that can be server change!\n\n🆕 <@&758828201958703205> - By adding this role, you will receive notifications about any changes regarding the server.\n\n📹 <@&788840581639569418> - By adding this role, you will receive notifications for the content people with Media rank make.\n\n🎉 <@&783524398757314581> - By adding this role, you will receive notifications about any giveaways that are active.`) // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
    channel.send(embed).then(async msg => {
      await msg.react("📢");
      await msg.react("🥇");
      await msg.react("🗳️");
      await msg.react("🆕");
      await msg.react("📹");
      await msg.react("🎉");
      // We're gonna using an await, to make the react are right in order.
    })
  }

  if (msg.startsWith(prefix + "messageverify")) {
    await message.delete()
    const embed = {
      "title": "Verification",
      "description": "In order to get access to the rest of the discord server, please read the rules mentioned above and then react to this message!",
      "color": "00aaff",
    }
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + 'bubble') || msg.startsWith(prefix + 'bubblewrap')) {
    await message.delete()
    message.channel.send("||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\n||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop|| ||Pop||\nVirtual bubble wrap!");

  }

  if (msg.startsWith(prefix + 'ht') || msg.startsWith(prefix + 'coinflip')) {
    function doRandHT() {
      var rand = ['HEADS!', 'TAILS!'];

      return rand[Math.floor(Math.random() * rand.length)];
    }

    const embed = {
      "title": `Here is the winner!`,
      "description": doRandHT(),
      "color": "00aa77",
    };
    message.channel.send({
      embed
    });


  };

  if (msg.startsWith(prefix + 'rd') || msg.startsWith(prefix + 'die') || msg.startsWith(prefix + 'rolldie') || msg.startsWith(prefix + 'rolladie')) {
    function doRandRD() {
      var rand = ['1!', '2!', '3!', '4!', '5!', '6!'];

      return rand[Math.floor(Math.random() * rand.length)];
    }

    const embed = {
      "title": `You rolled a`,
      "description": doRandRD(),
      "color": "00aa77",
    };
    message.channel.send({
      embed
    });


  };

  if (msg.startsWith(prefix + 'userinfo') || msg.startsWith(prefix + 'user')) {
    let user = message.mentions.users.first() || message.author;

    let userStatus;
    if (user.presence.status === "dnd") userStatus = "Do Not Disturb";
    if (user.presence.status === "idle") userStatus = "Idle";
    if (user.presence.status === "offline") userStatus = "Offline";
    if (user.presence.status === "online") userStatus = "Online";

    function game() {
      let game;
      if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
      else if (user.presence.activities.length < 1) game = "None"; // This will check if the user doesn't playing anything.
      return game; // Return the result.
    }

    let x = Date.now() - user.createdAt; // Since the user created their account.
    let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; // Since the user joined the server.
    let created = Math.floor(x / 86400000); // 5 digits-zero.
    let joined = Math.floor(y / 86400000);

    const member = message.guild.member(user);
    let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None";
    let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Created Date
    let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Joined the Server Date
    let status = user.presence.status;
    let avatar = user.avatarURL({
      size: 2048
    }); // Use 2048 for high quality avatar.

    const embed = new Discord.MessageEmbed()
      .setAuthor(user.tag, avatar)
      .setThumbnail(avatar)
      .setTimestamp()
      .setColor(0x7289DA)
      .addField("ID", user.id, true)
      .addField("Nickname", nickname, true)
      .addField("Created Account Date", `${createdate} \nsince ${created} day(s) ago`, true)
      .addField("Joined Guild Date", `${joindate} \nsince ${joined} day(s) ago`, true)
      .addField("Status", userStatus, true)
      .addField("Game", game(), true)

    message.channel.send(embed); // Let's see if it's working.
  }

  if (msg.startsWith(prefix + 'serverinfo')) {
    await message.delete()
    let icon = message.guild.iconURL({
      size: 2048
    }); // Server Avatar

    let region = {
      "brazil": "Brazil",
      "eu-central": "Central Europe",
      "singapore": "Singapore",
      "london": "London",
      "russia": "Russia",
      "japan": "Japan",
      "hongkong": "Hongkong",
      "sydney": "Sydney",
      "us-central": "U.S. Central",
      "us-east": "U.S. East",
      "us-south": "U.S. South",
      "us-west": "U.S. West",
      "eu-west": "Western Europe"
    }

    // Members
    let member = message.guild.members;
    let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
      online = member.cache.filter(m => m.user.presence.status === "online").size,
      idle = member.cache.filter(m => m.user.presence.status === "idle").size,
      dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
      robot = member.cache.filter(m => m.user.bot).size,
      total = message.guild.memberCount;

    // Channels
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
      vc = channels.cache.filter(r => r.type === "voice").size,
      category = channels.cache.filter(r => r.type === "category").size,
      totalchan = channels.cache.size;

    // Region
    let location = region[message.guild.region];

    // Date
    let x = Date.now() - message.guild.createdAt;
    let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
    let created = dateformat(message.guild.createdAt); // Install "dateformat" first.

    const embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setTimestamp(new Date())
      .setThumbnail(icon)
      .setAuthor(message.guild.name, icon)
      .setDescription(`**ID:** ${message.guild.id}`)
      .addField("Region", location)
      .addField("Date Created", `${created} \nsince **${h}** day(s)`)
      .addField("Owner", `**${message.guild.owner.user.tag}** \n\`${message.guild.owner.user.id}\``)
      .addField(`Members [${total}]`, `Online: ${online} \nIdle: ${idle} \nDND: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
      .addField(`Channels [${totalchan}]`, `Text: ${text} \nVoice: ${vc} \nCategory: ${category}`)
    message.channel.send(embed); // Let's see if it's working!
  }

  if (msg.startsWith(prefix + 'ping')) {
    try {
      const m = await message.channel.send("Pinging..."); // Make sure the async is written, top of the client.on("message", ...)
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM") // Tired of choosing the embed colors? Just type "RANDOM" on it!
        .addField("⌛ Latency", `**${m.createdTimestamp -  message.createdTimestamp}ms**`)
        .addField("💓 API", `**${Math.floor(client.ws.ping)}ms**`) // Use "client.ping" if your Discord.js is < 1.15.1 --- Use "client.ws.ping" if your Discord.js is > 12.0.0
      return m.edit(`🏓 Pong!`, embed);
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
      // Restart the bot as usual.
    }
  } // easy way.

  if (msg.startsWith(prefix + 'hello')) {
    message.channel.send('hewwo'); // results.
  }

  if (msg.startsWith(prefix + 'stats')) {
    await message.delete()
    cpuStat.usagePercent(function(error, percent, seconds) {
      if (error) {
        return console.error(error)
      }

      const cores = os.cpus().length // Counting how many cores your hosting has.
      const cpuModel = os.cpus()[0].model // Your hosting CPU model.
      const guild = client.guilds.cache.size.toLocaleString() // Counting how many servers invite your bot. Tolocalestring, meaning separate 3 numbers with commas.
      const user = client.users.cache.size.toLocaleString() // Counting how many members in the server that invite your bot.
      const channel = client.channels.cache.size.toLocaleString() // Counting how many channels in the server that invite your bot.
      const usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
      const Node = process.version // Your node version.
      const CPU = percent.toFixed(2) // Your CPU usage.

      const embed = new Discord.MessageEmbed() // Stable or < below than 11.x.x use RichEmbed. More than 12.x.x or Master or https://github.com/discordjs/discord.js/ (github:discordjs/discord.js) use MessageEmbed.
      // Actually they are exactly the same.
      embed.addField('Bot Statistics:', `Server: ${guild} \nUser: ${user} \nChannel: ${channel} \nUsage: ${usage} \nNode: ${Node} \nCPU Usage: ${CPU}%`) // Use Grave accent or `` 
      // (its on your keyboard, besides on number 1.)
      // Use \n to make a new line.
      embed.addField('Physical Statistics:', `CPU: ${cores} - ${cpuModel} \nUptime: **${parseDur(client.uptime)}**`)
      // Let's test it!
      // Use ** turn the text into bold.
      // Let's test again.
      message.channel.send(embed)
    })
  }

  if (msg.startsWith(prefix + "prune") || msg.startsWith(prefix + "purge")) { // You can make an aliases. Just like that.
    if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have a permissions to do this.");
    if (isNaN(args[0])) return message.channel.send("Please input a valid number.") // isNaN = is Not a Number. (case sensitive, write it right)
    if (args[0] < 100) {
      await message.delete()
      await message.channel.bulkDelete(args[0])
        .then(messages => message.channel.send(`Deleted ${messages.size}/${args[0]} messages.`)).then(d => d.delete({
          timeout: 10000
        })) // How long this message will be deleted (in ms)
        .catch(() => message.channel.send("Something went wrong, while deleting messages."))
    }
    if (args[0] < 2) return message.channel.send("Insert the number more than 1.")

    await message.delete()
    await message.channel.bulkDelete(args[0])
      .then(messages => message.channel.send(`Deleted ${messages.size}/${args[0]} messages.`)).then(d => d.delete({
        timeout: 10000
      })) // How long this message will be deleted (in ms)
      .catch(() => message.channel.send("Something went wrong, while deleting messages.")) // This error will be displayed when the bot doesn't have an access to do it.
  }

  if (msg.startsWith(prefix + "kick")) {
    if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have a permissions to do this.");
    let user = message.mentions.users.first();
    await message.delete()
    let member = message.guild.member(user);
    let reason = args.slice(1).join(" ");

    if (!user) return message.channel.send("Please mention the user.");
    if (user.id === message.author.id) return message.channel.send("You can't kick yourself.");
    if (user.id === client.user.id) return message.channel.send("You can't kick me.");

    if (!reason) reason = "No reason provided";

    member.kick(reason).then(() => {
      message.channel.send(`Successfully kicked **${user.tag}**`);
    }).catch(err => {
      message.reply("I was unable to kick the member.");
    })
  }

  if (message.content.startsWith(prefix + "ban")) {
    await message.delete()
    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
      return message.channel.send('You do not have the permission to ban users  !');
    }

    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
      return message.channel.send('')
    }

    const PingCheckEmbed = new Discord.MessageEmbed()
      .setTitle('**Incorrect Format**')
      .setDescription(`**Format:**\n?ban [@user]`)
      .setColor("RED")
      .setFooter(`SolusMC`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()

    if (message.mentions.users.size === 0) {
      return message.channel.send(PingCheckEmbed);
    }
    let banMember = message.guild.member(message.mentions.members.first().id);
    if (!banMember) {
      return message.channel.send('User not found!');
    }

    banMember.ban().then((member) => {
      const BanEmbed = new Discord.MessageEmbed()
        .setTitle('**Confirmed**')
        .setDescription(`**Success**\nUser has succesfully been banned from the server.`)
        .setColor("GREEN")
        .setFooter(`SolusMC`, member.user.avatarURL({
          dynamic: true
        })) // Dynamic: True just means that it can support gifs 
        .setTimestamp() // Sets Timestamp located in footer                          // To put servers Avatar use member.guild.iconURL() Also supports Dynamic
      message.channel.send(BanEmbed)

    })
  }

  if (msg.startsWith(prefix + "avatar")) {
    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = user.displayAvatarURL({
      size: 4096,
      dynamic: true
    });
    // 4096 is the new biggest size of the avatar.
    // Enabling the dynamic, when the user avatar was animated/GIF, it will result as a GIF format.
    // If it's not animated, it will result as a normal image format.

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag} avatar`)
      .setDescription(`[Avatar URL of **${user.tag}**](${avatar})`)
      .setColor(0x1d1d1d)
      .setImage(avatar)

    return message.channel.send(embed);
  }

  if (msg.startsWith(prefix + "ytstats")) {
    let name = args.join(" ");
    if (!name) return message.channel.send("Unknown channel name.");

    const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${client.config.google}&maxResults=1&type=channel`)
      .catch(() => message.channel.send("Unknown channel error."));

    if (!channel.body.items[0]) return message.channel.send("No channel result. Try again.");

    const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${client.config.google}`)
      .catch(() => message.channel.send("Unknown channel data error."));

    const embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
      .setTimestamp(new Date())
      .addField("Channel Name", channel.body.items[0].snippet.channelTitle, true)
      .addField("Channel Description", channel.body.items[0].snippet.description, true)
      .addField("Subscribers Count", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
      .addField("Total Views", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
      .addField("Total Video(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
      .addField("Date Created", new Date(channel.body.items[0].snippet.publishedAt).toDateString(), true)
      .addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
    return message.channel.send(embed);
  }

  if (msg.startsWith(prefix + "binary")) {
    if (!args[0]) return message.channel.send("Unknown parameter. Please choose the method first, either decode or encode it.");

    let choice = ["encode", "decode"];
    if (!choice.includes(args[0].toLowerCase())) return message.channel.send("Unknown parameter. Please choose the method first, either decode or encode it.");

    let text = args.slice(1).join(" ");
    // binary <encode | decode> <text>
    // binary encode blob development

    if (!text) return message.channel.send("Please input some text.");

    // Do this because more than that, the binary code wouldn't be fit anymore.
    if (text.length > 1024) return message.channel.send("Oww, that is way too much. The maximum character was 1,024.");

    function encode(char) {
      return char.split("").map(str => {
        const converted = str.charCodeAt(0).toString(2);
        return converted.padStart(8, "0");
      }).join(" ")
    };

    function decode(char) {
      return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
    };

    if (args[0].toLowerCase() === "encode") {
      return message.channel.send(encode(text));
    } else if (args[0].toLowerCase() === "decode") {
      return message.channel.send(decode(text));
    }
  }

  if (msg.startsWith(prefix + "spotify")) {
    await message.delete()
    let convert = require('parse-ms')
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }

    let status;
    if (user.presence.activities.length === 1) status = user.presence.activities[0];
    else if (user.presence.activities.length > 1) status = user.presence.activities[1];

    if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
      return message.channel.send("This user isn't listening to Spotify.");
    }

    if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
      let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
        url = `https:/open.spotify.com/track/${status.syncID}`,
        name = status.details,
        artist = status.state,
        album = status.assets.largeText,
        timeStart = status.timestamps.start,
        timeEnd = status.timestamps.end,
        timeConvert = convert(timeEnd - timeStart);

      let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
      let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
      let time = `${minutes}:${seconds}`;

      const embed = new Discord.MessageEmbed()
        .setAuthor("Spotify Track Information", "https://image.flaticon.com/icons/svg/2111/2111624.svg")
        .setColor(0x1ED768)
        .setThumbnail(image)
        .addField("Name:", name, true)
        .addField("Album:", album, true)
        .addField("Artist:", artist, true)
        .addField("Duration:", time, false)
        .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
      return message.channel.send(embed)
    }
  }

  if (msg.startsWith(prefix + "meme") || msg.startsWith(prefix + "memes")) {
    await message.delete()
    const got = require('got'),
      {
        MessageEmbed
      } = require('discord.js');

    got('https://www.reddit.com/r/meme/random/.json').then(response => {
      let content = JSON.parse(response.body),
        image = content[0].data.children[0].data.url,
        embed = new MessageEmbed()
        .setImage(image)
        .setTimestamp()
        .setFooter('from: r/meme')
      message.channel.send(embed);
    }).catch(console.log)
  }

  if (msg.startsWith(prefix + "programmingmeme") || msg.startsWith(prefix + "programmingmemes")) {
    await message.delete()
    const got = require('got'),
      {
        MessageEmbed
      } = require('discord.js');

    got('https://www.reddit.com/r/programmingmemes/random/.json').then(response => {
      let content = JSON.parse(response.body),
        image = content[0].data.children[0].data.url,
        embed = new MessageEmbed()
        .setImage(image)
        .setTimestamp()
        .setFooter('from: r/programmingmemes')
      message.channel.send(embed);
    }).catch(console.log)
  }

  if (msg.startsWith(prefix + "aww")) {
    await message.delete()
    const got = require('got'),
      {
        MessageEmbed
      } = require('discord.js');

    got('https://www.reddit.com/r/aww/random/.json').then(response => {
      let content = JSON.parse(response.body),
        image = content[0].data.children[0].data.url,
        embed = new MessageEmbed()
        .setImage(image)
        .setTimestamp()
        .setFooter('from: r/aww')
      message.channel.send(embed);
    }).catch(console.log)
  }

  if (msg.startsWith(prefix + "crappyoffbrand") || msg.startsWith(prefix + "offbrand")) {
    await message.delete()
    const got = require('got'),
      {
        MessageEmbed
      } = require('discord.js');

    got('https://www.reddit.com/r/crappyoffbrands/random/.json').then(response => {
      let content = JSON.parse(response.body),
        image = content[0].data.children[0].data.url,
        embed = new MessageEmbed()
        .setImage(image)
        .setTimestamp()
        .setFooter('from: r/crappyoffbrands')
      message.channel.send(embed);
    }).catch(console.log)
  }

  if (msg.startsWith(prefix + "dankmemes") || msg.startsWith(prefix + "dankmeme")) {
    await message.delete()
    const got = require('got'),
      {
        MessageEmbed
      } = require('discord.js');

    got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {
      let content = JSON.parse(response.body),
        image = content[0].data.children[0].data.url,
        embed = new MessageEmbed()
        .setImage(image)
        .setTimestamp()
        .setFooter('from: r/dankmemes')
      message.channel.send(embed);
    }).catch(console.log)
  }

  if (msg.startsWith(prefix + "pat")) {
    await message.delete()
    const {
      MessageAttachment
    } = require('discord.js');
    const {
      body
    } = fetch('https://nekos.life/api/v2/img/pat').then(res => res.json()).then(result => {
      if (!result.url) return message.channel.send("Something went wrong.");
      const attachment = new MessageAttachment(result.url);
      message.channel.send(":)", attachment)
    })
  }

  if (msg.startsWith(prefix + "meow")) {
    await message.delete()
    const {
      MessageAttachment
    } = require('discord.js');
    const {
      body
    } = fetch('https://nekos.life/api/v2/img/meow').then(res => res.json()).then(result => {
      if (!result.url) return message.channel.send("Something went wrong.");
      const attachment = new MessageAttachment(result.url);
      message.channel.send(attachment) // You can remove the :), it's optional.
    })
  }

  if (msg.startsWith(prefix + "woof")) {
    await message.delete()
    const {
      MessageAttachment
    } = require('discord.js');
    const {
      body
    } = fetch('https://nekos.life/api/v2/img/woof').then(res => res.json()).then(result => {
      if (!result.url) return message.channel.send("Something went wrong.");
      const attachment = new MessageAttachment(result.url);
      message.channel.send(attachment) // You can remove the :), it's optional.
    })
  }

  if (msg.startsWith(prefix + "mute")) {
    await message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("MUTE_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You don't have any permissions to do this: Manage Messages/Mute Members/Admin");
    }

    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("You need to mention the user.");
    // Optional:
    // if (user.id === client.user.id) return message.channel.send("You can't mute me.");
    // if (user.id === message.author.id) return message.channel.send("You can't mute yourself.");
    let role = message.guild.roles.cache.find(r => r.name === "Muted");
    let bot = message.guild.members.cache.get(client.user.id).roles.highest;

    if (!role) return message.channel.send("Couldn't find the mute role.");
    if (role.position > bot.position) return message.channel.send("The role is higher than me.");

    let time = args[1];

    if (!time) {
      if (user.roles.cache.has(role.id)) return message.channel.send("The user is still muted.");
      await (user.roles.add(role.id).catch(err => message.channel.send(`Something went wrong: ${err}`)))
      return message.channel.send(`${user.user.tag} is now muted.`);
    } else {
      if (user.roles.cache.has(role.id)) return message.channel.send("The user is still muted.");
      await (user.roles.add(role.id).catch(err => message.channel.send(`Something went wrong: ${err}`)))

      let timer = setTimeout(function() {
        user.roles.remove(role.id).catch(err => message.channel.send(`Something went wrong: ${err}`));
        message.channel.send(`${user.user.tag} is now unmuted.`);
      }, ms(time))

      client.mute.set(user.user.id, timer);
      message.channel.send(`${user.user.tag} is now muted for **${ms(ms(time), {long: true})}**`);
    }
  }

  if (msg.startsWith(prefix + "unmute")) {
    await message.delete()
    if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("MUTE_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You don't have any permissions to do this: Manage Messages/Mute Members/Admin");
    }

    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("You need to mention the user.");

    let role = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!role) return message.channel.send("Couldn't find the mute role.");

    if (!user.roles.cache.find(r => r.name === "Muted")) return message.channel.send("The user doesn't get muted.");

    await user.roles.remove(role.id).catch(err => message.channel.send(`Something went wrong: ${err}`));
    await clearTimeout(client.mute.get(user.user.id));
    await client.mute.delete(user.user.id);
    await message.channel.send(`${user.user.tag} is now unmuted.`);
  }

  if (msg.startsWith(prefix + "solus") || msg.startsWith(prefix + "info")) {
    await message.delete()
    const embed = {
      "title": "SolusMC",
      "description": "SolusMC is a **Cracked** Minecraft server founded by @Cicada3083 and it was released for the first time on **August 25, 2020**. Ever since, our server's player base is intermittently growing since it's first released, users around all over the world playing our amazing gamemodes and enjoying their time here with our beloved community. Can't wait to play? Join the community today!",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "rules") || msg.startsWith(prefix + "rule")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Rules",
      "description": "Please read the Discord rules at #rules. Server/Network Rules are located at https://www.solusmc.net/forums/forum/topic/9-network-rules",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "forums") || msg.startsWith(prefix + "forum")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Forums",
      "description": "Please visit the SolusMC Forums located at https://solusmc.net/forums/forum",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "website")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Website",
      "description": "Please visit the SolusMC website located at https://www.solusmc.net/",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "discord") || msg.startsWith(prefix + "invite")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Discord Invites",
      "description": "Native Discord Invite: https://discord.gg/vVbx9YU\nInvite.GG Invite: https://invite.gg/solusmc",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "store") || msg.startsWith(prefix + "donate")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Store",
      "description": "Please consider making a donation at https://solusmc.tebex.io",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "apply")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Applications",
      "description": "Please see https://www.solusmc.net/forums/forum/view/17-applications-and-appeals/ for more information regarding applying for staff, builder, and appealing a ban or blacklist. Please read the guidelines and requirements before you apply!",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "staff")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Staff",
      "description": "Please see https://www.solusmc.net/staff.html for all our staff!",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "ip")) {
    await message.delete()
    const embed = {
      "title": "SolusMC IP",
      "description": "PLAY.SOLUSMC.NET",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "vote")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Vote Link",
      "description": "Please consider supporting the server at the links at https://www.solusmc.net/vote.html. It helps out a ton if you vote!",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "help")) {
    await message.delete()
    const embed = {
      "title": "SolusMC Spy Help",
      "description": "?help 🢚 This help this!\n?info 🢚 Give info about the server!\n?serverinfo 🢚 Information about the server!\n?userinfo 🢚 Information about the user!\n?stats 🢚 Information about SolusMC Spy bot!\n?ping 🢚 Ping this Discord bot to see latency!\n?ip 🢚 IP Address for the server!\n?rules 🢚 Ger server rules link!\n?forums 🢚 Get link to Forums!\n?website 🢚 Get link to Website!\n?store 🢚 Get link to the server store!\n?apply 🢚 Get link to all server applications and appeals!\n?staff 🢚 Get link to all the SolusMC staff list!\n?vote 🢚 Get link to all the vote sites!",
      "color": "00aaff",
    };
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "changelog") && message.member.hasPermission("ADMINISTRATOR")) {
    await message.delete()
    const embed = {
      "title": "Changelog | Carisa v1.1.0 | Added & Fixed",
      "description": "🢚 Fixed a bug where the force field will disappear when the player was retagged by the Citizens Compatibility expansion with a null enemy.\n🢚 Combat Logger NPCs will no longer go through force fields into safe zones. (experimental, needs testing)\n🢚 Fixed untag on enemy death\n🢚 Fixed packet error on versions newer than 1.12.2",
      "color": "ffff00",
      "footer": {
        "text": "IP: PLAY.SOLUSMC.NET ",
        "icon_url": "https://solusmc.net/logo.png"
      },
      "timestamp": "2020-11-21T15:21:28.906"
    }
    message.channel.send("<@&758828201958703205>")
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "about") && message.member.hasPermission("ADMINISTRATOR")) {
    await message.delete()
    const embed = {
      "title": "SolusMC - About",
      "description": "**SolusMC** is a **Cracked** Minecraft server founded by Cicada3083 (Khosraw Azizi) and it was released for the first time on August 25, 2020. Ever since, our server's player base is intermittently growing since it's first released, users around all over the world playing our amazing gamemodes and enjoying their time here with our beloved community. Can't wait to play? Join the community today!\n\n`-` **Server IP:** play.solusmc.net\n`-` **Website:** http://www.solusmc.net/\n`-` **Store:** https://solusmc.tebex.io/\n`-` **Discord:** https://discord.gg/hkGsWE4",
      "color": "00aaff",
    }
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "gamemodes") && message.member.hasPermission("ADMINISTRATOR")) {
    await message.delete()
    const embed = {
      "title": "Gamemodes",
      "description": "☁️ **SkyPVP:** You will spawn with a kit and will have to grind your way up to earn gold. Upgrade your gear and enchant your items. Build the ultimate kit and battle through the skies!\n🛏️ **Bedwars:** You and your teammates are fighting for the leadership of the dream world. Collect iron and gold on your spawn island to buy a starts loadout. Rush to the middle islands to collect diamonds and emeralds. Fight your way through the dream world and be the last man or team standing! We offer 1v1, 2v2, Solo, Triples, and Quadruples. We also offer custom events such as 10v10 and more.\n🌻 **Survival:** Survival is a game mode where players are challenged to build and survive in a magical world. Your goal is to amass as much wealth as possible while you can build anything on your own claim!\n⛈️ **Skywars(Coming Soon):** You are found in the sky, fighting with your enemies until there is only one player standing. If you die/fall into the void, you are out!",
      "color": "00aaff",
    }
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "adminrules")) {
    await message.delete()
    const embed = {
      "title": "Rules",
      "description": "**Text Channel Rules**\n\n· No DDoS/Dox threats towards any player for any reason (This can also apply to other forms of communication outside of the network only at an administrator's decision.)\n· No form of threats at all towards any player for any reason\n· No suicide encouragement (e.g \"kys\" \"Kill yourself\" \"slit your wrists\")\n· No spamming/flooding chat or encouraging spam (general rule of thumb of what qualifies as spam; 3 or more duplicate messages in a 10s span, this includes spamming commands)\n· No intentionally advertising any other minecraft server in any way on any platform.\n· Be kind to all players and staff, any form of toxicity is mutable.\n· Do not try to trick players into thinking you are staff/impersonating staff\n· No NSFW links (\"Not safe for work\" links, e.g. link to screamers, porn, or anything inappropriate)\n· No download links anywhere. In-game, Forums, Discord ... etc\n· No solicitation or giveaways if items/things unrelated to SolusMC (e.g. \"Selling Minecraft accounts cheap! message me!\" or \"Giving away MineCon capes, message me!\"\n· No selling in-game items for real life currency. (This includes items like warp crates, keys, gear ...etc)\n· No advertising your Discord server ingame.\n· You may advertise your stream/video as long as it is SolusMC related, and only 1 link per 5 minutes!\n· No inappropriate messages in chat. (e.g. talking about nudity, sex, blood/gore...etc)\n\n\n**Voice Channel Rules**\n\n· No disruptive, loud / high pitch noises\n· No quickly switching from different Voice channels repeatedly\n· No live streaming inappropriate content\n\n**Server/Network** Rules are located at https://www.solusmc.net/forums/forum/topic/9-network-rules.",
      "color": "00aaff",
    }
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "voting") && message.member.hasPermission("ADMINISTRATOR")) {
    await message.delete()
    const embed = {
      "title": "Voting Rewards",
      "description": "To vote, you must type /vote in-game and click on a URL from the GUI menu. You must go to the link, enter your username, and verify that you are not a robot.\n\nTo make sure that you receive a reward, go to the Hub/Lobby and vote from there. If you are not online at the server, you will not receive a Mystery Box!",
      "color": "00aaff",
    }
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "otherhelp") && message.member.hasPermission("ADMINISTRATOR")) {
    await message.delete()
    const embed = {
      "title": "Help, Suggestions, Rules, and Applications",
      "description": "For help and other issues, please see https://www.solusmc.net/forums/forum/view/14-community-help/.\n\nIf you want to suggest something, please do so at https://www.solusmc.net/forums/forum/view/16-suggestions/.\n\nIf you want to read the rules, please do so at https://www.solusmc.net/forums/forum/topic/9-network-rules.\n\nPlease see https://www.solusmc.net/forums/forum/view/17-applications-and-appeals/ for more information regarding applying for staff, builder, or YouTuber, and appealing.",
      "color": "00aaff",
    }
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "donation") && message.member.hasPermission("ADMINISTRATOR")) {
    await message.delete()
    const embed = {
      "title": "DONATION ALERT",
      "description": "2005Matt123 just bought a VIP rank on SkyPVP! GG, and thanks for the support!",
      "color": "00aaff",
    }
    message.channel.send({
      embed
    });
  }

  if (msg.startsWith(prefix + "ticket-setup")) {
    await message.delete()
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const noperms = new discord.MessageEmbed()
        .setDescription('<a:wrong:777309444690149396> **| Missing Permission: \`ADMINISTRATOR\`**')
        .setColor("ff0000")
        .setImage('https://i.imgur.com/PM0yJRZ.png')

      return message.channel.send(noperms)
    }

    let channel = message.mentions.channels.first();
    if (!channel) {
      const nochannel = new Discord.MessageEmbed()
        .setDescription(`**| Missing Argument: \`CHANNEL\`**`)
        .setColor("ff0000")

      return message.channel.send(nochannel)
    }

    let sent = await channel.send(new Discord.MessageEmbed()
      .setTitle("Ticket System")
      .setDescription("React to open a ticket!")
      .setFooter("Ticket System")
      .setColor("00ff00")
    );

    sent.react('🎫');


    const successembed = new Discord.MessageEmbed()
      .setDescription(`**| Successfully set <#${channel.id}> as your ticket channel!**`)
      .setColor("00ff00")

    message.channel.send(successembed)
  }

  if (msg.startsWith(prefix + "close")) {
    await message.delete()
    if (!message.channel.name.includes("ticket-")) {
      const youcant = new Discord.MessageEmbed()
        .setDescription(`**| You cannot use that command in this channel!**`)
        .setColor("ff0000")

      return message.channel.send(youcant)
    }

    const deletingembed = new Discord.MessageEmbed()
      .setDescription(`**| Closing ticket...**`)
      .setColor("#03a9f4")

    return message.channel.send(deletingembed).then(setTimeout(() => {
      message.channel.delete()
    }, 5000))
  }

});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();

  if (user.bot) return;

  let ticketid = user.id;

  if (!ticketid) return;

  if (reaction.emoji.name == '🎫') {
    reaction.users.remove(user);

    reaction.message.guild.channels.create(`ticket-${user.username}`, {
      permissionOverwrites: [{
          id: user.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        },
        {
          id: reaction.message.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
        }
      ],
      type: 'text'
    }).then(async channel => {
      channel.send(`<@${user.id}> <@&784668985190645810>`, new Discord.MessageEmbed().setTitle("Welcome to your support ticket!").setDescription("While waiting for staff to assist you, please provide the following: \n \n > • Why did you make a ticket?").setColor("00ff00").setFooter('To close ticket, \`?close\`'))
    })
  }
})

client.login(''); // Put your token into the .env
// Make sure to lock your project. Go to the your name project and click "Make This Project Private"

function formatBytes(a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));

  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
} // Create MB, KB, TB or something in the back of your memory counters.

function parseDur(ms) {
  let seconds = ms / 1000,
    days = parseInt(seconds / 86400);
  seconds = seconds % 86400

  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600

  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)

  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`
  }

  return `${seconds} second(s)`
} // Uptime bot.

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}