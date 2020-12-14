module.exports = {
    name: "ping",
    aliases: ["pong"],
    exec: (msg) => {
        msg.channel.send({embed: {color: 'black', description:`🏓 Pong! \`${msg.client.ws.ping}ms\``}});
    }
};
