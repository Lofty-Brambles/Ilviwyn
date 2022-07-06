/* eslint-disable global-require */
const { Client, Collection } = require("discord.js");

module.exports = class extends Client {
	constructor() {
		super({
			partials: [
				"CHANNEL",
				"MESSAGE",
				"REACTION",
				"USER",
				"GUILD_MEMBER",
			],
			intents: [
				"GUILDS",
				"GUILD_MEMBERS",
				"GUILD_EMOJIS_AND_STICKERS",
				"GUILD_WEBHOOKS",
				"GUILD_MESSAGES",
				"GUILD_MESSAGE_REACTIONS",
			],
			presence: {
				status: "dnd",
			},
		});

		this.config = require("../admin/config");
		this.logger = require("../util/logger");
		// WRITE: this.mongoose = require("../database");

		// TODO
		this.slashCommands = new Collection();
		this.buttonCommands = new Collection();
		this.selectCommands = new Collection();
		this.contextCommands = new Collection();
		this.modalCommands = new Collection();
		this.cooldowns = new Collection();
	}

	/**
	 * A function for setting an activity for the bot
	 * @param {string} name - name of activity
	 * @param {string} type - type of activity
	 * @param {url} url - url related to activity
	 */
	setActivity(name, type = "PLAYING", url = "") {
		this.presenceType = type;
		try {
			this.user.setActivity(name, { type, url });
		} catch (e) {
			this.logger.error(`Error while setting activity - ${e}`);
		}
	}
};
