const util = require("../util");
const Discord = require('discord.js');

const unlisted = ["eval", "source"];

module.exports = {
  name: "help",
  aliases: ["commands", "h"],
  exec: msg => {
    const commands = msg.client.commands
    
      .filter(c => !unlisted.includes(c.name))
    const client = msg.client
    const embed = new Discord.MessageEmbed()
      
      .setAuthor(
        "Xyther Command List",
        "https://cdn.discordapp.com/attachments/754711051001528371/783316351971491840/783171053836435466.gif"
      )
      .setColor('RANDOM')
      .setThumbnail(client.user.displayAvatarURL())
      .addField("Music Commands", `Here Is All Music Commands`)
      .addField("Play",[ `**❯ Aliases:** (p)`,
                       `**❯ Description:** You Can Play Songs By Using Song Title And Links`
                       ])

      .addField("Now Playing", [ `**❯ Aliases:** (np)`,
                                `**❯ Description:** You Can See Which Song Currently Playing By Using This Command`
                               ])
      .addField("Loop" , [ `**❯ Aliases:** (l)`,
                          `**❯ Description:** You Can Loop/Repeat Queue Or Any Single Track`
                         ])
      .addField("Pause" , [ `**❯ Aliases:** (ps)`,
                           `**❯ Description:** You Can Pause The Song By Using This Command`
                          ])
      .addField("Queue" , [ `**❯ Aliases:** (q)`,
                           `**❯ Description:** You Can See Song Queue By Using This Command`
                          ])
      .addField("Resume" , [ `**❯ Aliases:** (r)`,
                            `**❯ Description:** You Can Resume Paused Song By Using This Command` 
                           ])
      .addField("Seek" , [ `**❯ Aliases:** (sk)`,
                          `**❯ Description:** You Can Sets The Playing Track's Position To The Specified Position By Using This Command`
                          ])
      .addField("Skip" , [ `**❯ Aliases:** (s)`,
                          `**❯ Description:** You Can Skip Current Playing Song By Using This Command`
                          ])
      .addField("Stop" , [ `**❯ Aliases:** (sp)`,
                          `**❯ Description:** You Can Clear Queue And Stop All Song Without Disconnecting Bot From Vc By Using This Command`
                          ])
      .addField("Volume" , [ `**❯ Aliases:** (v)`,
                            `**❯ Description:** You Can Increase Or Decrease Bot's Volume By Using This Command`
                            ])
    .addField("Disconnect" ,[ `**❯ Aliases:** (dc)`,
                             `**❯ Description:** Disconnect Bot From Voice Channel By Using This Command`
                             ])
    .addField("Avatar"     ,[`**❯ Aliases:** (av)`,
                             `**❯ Description:** Look at Your or Other People's Aavatar! Using this command`
                             ])
                             

      .setTimestamp()
      .setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true }));

    //  .addField(
    //  "Add to Discord",
    //  "Jarvis can be added to as many servers as you want! [Click here to add it to yours](https://discord.com/oauth2/authorize?client_id=781419215734964234&scope=bot&permissions=8)"
    // );
    msg.channel.send(embed);
  }
};
