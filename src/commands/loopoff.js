module.exports = {
  name: 'loopoff',
  aliases: ['loopdisable'],
  exec: (message, args) => {
    if(!message.guild.me.voice.channel) message.member.voice.channel.join()
    const {music} = message.guild;
    music.loop = false;
    music.trackloop = false;
    message.channel.send({embed: {
      description: 'Looping is now **disabled**',
      color: 'black'
    }})
  }
}