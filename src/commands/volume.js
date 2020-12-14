const util = require("../util");

module.exports = {
    name: "volume",
    aliases: ["v"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        const newVolume = args[0];
        if (!music.player || !music.player.playing) return msg.channel.send({embed: {color: 'black', description:"Currently not playing anything."}});
        try {
            if (!newVolume || isNaN(newVolume)) {
                msg.channel.send(util.embed().setDescription(`Current volume \`${music.volume}\``));
            } else {
                if (!msg.member.voice.channel)
                    return msg.channel.send({embed: {color: 'black', description:"You must be in a voice channel"}});
                if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
                    return msg.channel.send({embed: {color: 'black', description:`You must be in same voice channel`}});

                await music.setVolume(newVolume);
                msg.channel.send({embed: {color: 'black', description:`Volume \`${music.volume}\``}});
            }
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
