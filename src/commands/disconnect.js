module.exports = {

      name: "disconnect",
     aliases: ["dc"], 
			description: 'Leaves the voice channel.',			requireMusic: true,

     exec: async (msg, args) => {

  //   const music = msg.client.queue.get(msg.guild.id);
     
  //   msg.guild.music.queue = []

       msg.client.manager.leave(msg.guild.id)

  //  msg.member.voice.channel.leave()

		return msg.channel.send(`Successfully left the voice channel`);

	}

}