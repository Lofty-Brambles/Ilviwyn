const { Schema, model } = require("mongoose");
const { moduleArray } = require("../../data/GuildData");

const Guild = new Schema({
	guildID: String,
	guildName: String,
	modules: { type: Array, default: moduleArray },
});

module.exports = model("Guild", Guild);
