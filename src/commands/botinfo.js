const { version } = require("./../../package.json");
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const djs = require("discord.js");

module.exports = {
  name: "botinfo",
  cooldown: 0,
  aliases: ["bi"],
  description: "Shows the statistics for the bot",
  exec: async (message, args) => {
    const client = message.client;
    let users = client.guilds.cache.reduce(
      (prev, val) => val.memberCount + prev,
      0
    );
    let guilds = client.guilds.cache.size;
    let channels = client.channels.cache.size;
    let memory = process.memoryUsage().heapUsed / 1024 / 1024;
    let commands = message.client.commands.array();
    let vc = message.client.manager.players.size;

    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    const shardID = message.guild ? message.guild.shardID + 1 : 1;
    const core = os.cpus()[0];
    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayHexColor || "RED")
      .addField("General", [
        `**❯ Owners:** - ⚘ 𝕍 𝗔 𝐌 Ꮲ 🆈 𝕺𝕻 †`,
        `**❯ Developer:** - ⚘ 𝕍 𝗔 𝐌 Ꮲ 🆈 𝕺𝕻 †`,
        `**❯ Client:** ${client.user.tag} (${client.user.id})`,
        `**❯ Commands:** ${client.commands.size}`,
        `**❯ Servers:** ${guilds.toLocaleString()} `,
        `**❯ Users:** ${users.toLocaleString()}`,
        `**❯ Channels:** ${channels.toLocaleString()}`,
        `**❯ Voice Stream:** ${vc}`,
        `**❯ Creation Date:** ${utc(client.user.createdTimestamp).format(
          "Do MMMM YYYY HH:mm:ss"
        )}`,
        `**❯ Node.js:** ${process.version}`,
        `**❯ Version:** v${version}`,
        `**❯ Discord.js:** v${djs.version}`,
        `**❯ Real Uptime: ** ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
        "\u200b"
      ])
      .addField("System", [
        `**❯ Platform:** ${process.platform}`,
        `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
        `**❯ CPU:**`,
        `\u3000 Cores: ${os.cpus().length}`,
        `\u3000 Model: ${core.model}`,
        `\u3000 Speed: ${core.speed}MHz`
      ])
      .setTimestamp();

    message.channel.send(embed);
  }
};
