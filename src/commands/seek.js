const util = require("../util");

const durationPattern = /^[0-5]?[0-9](:[0-5][0-9]){1,2}$/;

module.exports = {
    name: "seek",
    aliases: ["sk"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send({embed: {color: 'black', description:"Currently not playing anything."}});
        if (!msg.member.voice.channel)
            return msg.channel.send({embed: {color: 'black', description:"You must be in a voice channel."}});
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send({embed: {color: 'black', description:`You must be in same voice channel`}});

        if (!music.current.info.isSeekable)
            return msg.channel.send({embed: {color: 'black', description:"Current track isn't seekable."}});

        const duration = args[0];
        if (!duration)
            return msg.channel.send({embed: {color: 'black', description:"You must provide duration to seek. Valid duration e.g. `1:34`."}});
        if (!durationPattern.test(duration))
            return msg.channel.send({embed: {color: 'black', description:"You provided an invalid duration. Valid duration e.g. `1:34`."}});

        const durationMs = util.durationToMillis(duration);
        if (durationMs > music.current.info.length)
            return msg.channel.send({embed: {color: 'black', description:"The duration you provide exceeds the duration of the current track."}});

        try {
            await music.player.seek(durationMs);
            msg.react(`👌`);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
