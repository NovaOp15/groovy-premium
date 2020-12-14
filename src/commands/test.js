const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queues",
    description: "Queue command",
    aliases: ['qs'],
  exec: async (bot, msg, args) => {
    const player = msg.client.manager.players.get(msg.guild.id);
    if (!player) return msg.reply("I have not joined a channel because I have nothing to play. Use the play command to play the song.");

    const queue = player.queue;
    const embed = new MessageEmbed().setAuthor(`Queue for ${msg.guild.name}`);

    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.addField("Current", `[${queue.current.title}](${queue.current.uri})`);

    if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

    return msg.reply(embed);
  }
}