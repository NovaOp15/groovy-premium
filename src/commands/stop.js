const util = require("../util");

module.exports = {
    name: "stop",
    aliases: ["sp"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send({embed: {color: 'black', description:"Currently not playing anything."}});
        if (!msg.member.voice.channel)
            return msg.channel.send({embed: {color: 'black', description:"You must be in a voice channel."}});
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send({embed: {color: 'black', description:`You must be in same voice channel`}});

        try {
          music.loop = false;
          music.trackloop = false;
            await music.stop();
          
            msg.react("🛑").catch(e => e);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
