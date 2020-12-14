const { Utils } = require("./formatTime.js");

module.exports = duration => {
  if (isNaN(duration) || typeof duration === "undefined") return "00:00";

  if (duration > 3600000000) return "Live";
  let u = Utils.formatTime(duration, true);
  if(u <60) u = `00:${u}`;
  return u;
};
