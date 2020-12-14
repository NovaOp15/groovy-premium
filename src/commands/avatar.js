module.exports = {
  name: "avatar",
  aliases: ['av'],
  exec: async (message, args) => {
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user || message.author
    if(!member) return message.reply('Could\'nt find the member')
   message.channel.send({
     embed: {
       author: {
         name: member.tag,
         icon_url: member.avatarURL({dynamic: true})
       },
       image: {
         url: member.avatarURL({dynamic: true, size: 2048})
       },
       title: 'Avatar'
     }
   }) 
  }
};
