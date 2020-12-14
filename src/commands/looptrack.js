module.exports = {
  name: 'looptrack',
  aliases: ['loopsong'],
  exec: (message, args) => {
    if(!message.guild.me.voice.channel) message.member.voice.channel.join()
    const {music} = message.guild;
    music.loop = false;
    music.trackloop = true;
    message.channel.send({
      embed: {
        color: 'black',
        description: 'Now looping the **current queue**'
      }
    })
  }
}