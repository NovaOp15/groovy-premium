const { Rest } = require("lavacord");
const util = require("../util");

module.exports = class MusicHandler {
  /** @param {import("discord.js").Guild} guild */
  constructor(guild) {
    this.guild = guild;
    this.volume = 100;
    this.loop = false;
    this.previous = null;
    this.current = null;
    this.queue = [];
    this.autoplay = false;
    this.autoplayed = [];
    this.prune = null;
    /** @type {import("discord.js").TextChannel|null} */
    this.textChannel = null;
  }

  get voiceChannel() {
    return this.guild.me.voice.channel;
  }

  /** @returns {import("../structures/MusicClient")} */
  get client() {
    return this.guild.client;
  }

  get player() {
    return this.client.manager.players.get(this.guild.id) || null;
  }

  get node() {
    return this.client.manager.nodes.get("main");
  }

  reset() {
    this.trackloop = false;
    this.loop = false;
    this.volume = 100;
    this.previous = null;
    this.current = null;
    this.queue = [];
    this.textChannel = null;
    this.prune = null;
  }

  /** @param {import("discord.js").VoiceChannel} voice */
  async join(voice) {
    if (this.player) return;
    await this.client.manager.join(
      {
        channel: voice.id,
        guild: this.guild.id,
        node: this.node.id
      },
      { selfdeaf: true }
    );

    this.player
      .on("start", () => {
        this.current = this.queue.shift();
        if (this.textChannel)
          this.textChannel.send({
            embed: {
              color: "black",
              title: "Now Playing",
              description: `[${this.current.info.title}](${this.current.info.uri})`
            }
          });
      })
      .on("end", async data => {
        if (data.reason === "REPLACED") return;
        this.previous = this.current;
        this.current = null;
        if (this.trackloop) {
          this.queue.push(this.previous);
          array_move(this.queue, -1);
        } else if (this.loop) this.queue.push(this.previous);
        if (this.autoplay) {
          this.autoplayed.push(this.previous.info.title)
          const { loadType, tracks } = await this.load(
            `ytsearch:${this.previous.info.author}`
          ).catch(console.error);
          if (loadType === "PLAYLIST_LOADED") {
            for (const track of tracks) {
              this.queue.push(track);
            }
          } else {
            const track = tracks.filter(
              x => !this.autoplayed.includes(x.info.title)
            )[0];
            this.queue.push(track);
          }
        }
        if (!this.queue.length) {
          
          //   this.client.manager.leave(this.guild.id);
          //   if (this.textChannel) this.textChannel.send(util.embed().setDescription("✅ | Queue is empty. Leaving voice channel.."));
          this.reset();
          return;
        }
        this.start();
      })
      .on("error", console.error);
  }

  /** @param {import("discord.js").TextChannel} text */
  setTextCh(text) {
    this.textChannel = text;
  }

  async load(query) {
    const res = await Rest.load(this.node, query);
    return res;
  }

  async start() {
    if (!this.player) return;
    await this.player.play(this.queue[0].track);
  }

  async pause() {
    if (!this.player) return;
    if (!this.player.paused) await this.player.pause(true);
  }

  async resume() {
    if (!this.player) return;
    if (this.player.paused) await this.player.pause(false);
  }

  async skip() {
    if (!this.player) return;
    await this.player.stop();
  }

  async stop() {
    if (!this.player) return;
    this.loop = false;
    this.trackloop = false;
    this.autoplay = false;
    this.queue = [];
    await this.skip();
  }
   async prune() {
		this.queue.length = 0;
		return this;
	}

   async clear() {
		this.recentlyPlayed.length = 0;
		this.queue.length = 0;
		this.channel = null;
		this.autoplay = false;


		return this;
  }
  async setVolume(newVol) {
    if (!this.player) return;
    const parsed = parseInt(newVol, 10);
    if (isNaN(parsed)) return;
    await this.player.volume(parsed);
    this.volume = newVol;
  }
};
function array_move(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }

  while (new_index < 0) {
    new_index += arr.length;
  }

  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;

    while (k--) {
      arr.push(undefined);
    }
  }

  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

  return arr; // for testing purposes
}
