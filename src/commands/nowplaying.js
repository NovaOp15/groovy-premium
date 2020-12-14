const util = require("../util");
const moment = require("moment");
require("moment-duration-format")(moment);
const { stripIndents } = require("common-tags");

const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  exec: msg => {
    const bot = msg.client;
    const message = msg;
    const {music} = message.guild;
    if(!music.player) return message.reply('No Song Playing!')
    const queue = music;

    const player = msg.guild.music.player;

    const currentTime = player.state.position;

    const trackLength = queue.current.info.length;

    const timeDisplay = `\`${moment
      .duration(currentTime, "milliseconds")
      .format()}/${moment.duration(trackLength, "milliseconds").format()}\``;

    const timeBar = "━".repeat(30).split("");

    for (let i = 0; i < timeBar.length; i++) {
      // Multiply len by the pattern length to get the right rate to change the dot's positon. Defaults to 1.

      if (
        i === timeBar.length - 1 ||
        i === Math.round((30 * currentTime) / trackLength)
      ) {
        timeBar.splice(i, 1, "🔘"); // Replace the character at this index with the dot to visualize the player's current position.

        break;
      }
    }

    if (!player || !queue.current.info)
      return message.channel.send({
        embed: {
          description: "No song currently playing in this guild",
          color: "RED"
        }
      });

    const { title, author, length} = queue.current.info;
    const { requester } = queue.current;

    let amount = `${bot.formatDuration(player.state.position)}`;

    const part = Math.floor((player.state.position / length) * 10);

    let h;

    let bar;

    if (bot.formatDuration(length) === "Live") {
      h = "Live";

      bar = `▬▬▬▬▬▬▬▬▬▬🔘`;
    } else {
      h = `${amount} / ${bot.formatDuration(length)}`;

      bar = `${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}`;
    }
    const embed = new MessageEmbed()

      .setAuthor("Now Playing")

      .setDescription(`[${
          queue.current.info.title
        }](${queue.current.info.uri})\n\n${bar} \`[${h}]\`
     ` )
.setTimestamp()
      .setFooter(requester.tag, requester.avatarURL({dynamic: true}))
.setThumbnail(`https://img.youtube.com/vi/${queue.current.info.uri.slice(32)}/maxresdefault.jpg`)
      .setColor("black");

    return message.channel.send(embed).catch(err => message.channel.send(err));
  }
};
