const util = require("../util");
const sastaLoop = new Map();
module.exports = {
  name: "loop",
  aliases: ["l"],
  exec: (msg, args) => {
    const message = msg;
    const { music } = msg.guild;
    if(!message.guild.me.voice.channel) message.member.voice.channel.join()
  /*  if (!music.player)
      return msg.channel.send({
        embed: {
          color: "black",
          description: "Currently not playing anything."
        }
      });
    if (!msg.member.voice.channel)
      return msg.channel.send({
        embed: {
          color: "black",
          description: "You must be in a voice channel."
        }
      });
    if (
      msg.guild.me.voice.channel &&
      !msg.guild.me.voice.channel.equals(msg.member.voice.channel)
    )
      return msg.channel.send({
        embed: {
          color: "black",
          description: `You must be in same voice channel`
        }
      });
      */
    if (!args[0]) {
      const xd = sastaLoop.get(msg.guild.id);
      if (xd == null || xd == 0) {
        sastaLoop.set(msg.guild.id, 1);
        music.loop = !music.loop;
        music.trackloop = false;
        msg.channel.send({
          embed: { color: "black", description: `Now looping the **queue**` }
        });
      } else if (xd == 1) {
        sastaLoop.set(msg.guild.id, 2);
        music.trackloop = !music.trackloop;
        music.loop = false;
        msg.channel.send({
          embed: {
            color: "black",
            description: `Now looping the **current track** `
          }
        });
      } else if (xd == 2) {
        sastaLoop.set(msg.guild.id, 0);
        music.trackloop = false;
        music.loop = false;
        msg.channel.send({
          embed: { color: "black", description: `Looping is now **disabled**` }
        });
      }
    } else if (args[0] == "song" || args[0] == "track") {
      music.trackloop = !music.trackloop;
      music.loop = false;
      msg.channel.send({
        embed: {
          color: "black",
          description: `Now looping the **current track** `
        }
      });
    } 
    else if (args[0] == 'queue' ) {
      music.loop = !music.loop;
      music.loop = false;
      msg.channel.send({
        embed: {
          color: "black",
          description: `Now looping the **queue** `
        }
      });
    }
    else if(args[0] == 'off' || args[0] == 'disable') {
      music.trackloop = false;
      music.loop = false;
      msg.channel.send({
        embed: {
          color: 'black',
          description: `Looping is now **disabled** `
        }
      });
    }
    
  }
};





  
