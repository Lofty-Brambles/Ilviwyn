/* eslint-disable global-require */
const { Guild } = require("discord.js");

module.exports = Object.defineProperties(Guild.prototype, {
	fetchDtls: {
		async value() {
			this.settings = await require("../data/GuildData.json");
		},
	},
});
