module.exports = {
  name: "loopqueue",
  exec: (message, args) => {
    if(!message.guild.me.voice.channel) message.member.voice.channel.join();
    
   
    const {music} = message.guild;
    music.trackloop = false;
    music.loop = true;
    message.channel.send({
      embed: {
        color: 'black',
        description: 'Now looping the **queue**'
      }
    })
  }
};
