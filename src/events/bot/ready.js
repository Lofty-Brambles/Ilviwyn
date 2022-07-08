/* eslint-disable no-await-in-loop */
const Event = require("../../structs/Event");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, { dir: __dirname });
		this.config.once = true;
	}

	// eslint-disable-next-line class-methods-use-this
	async run(client) {
		setInterval(async () => {
			if (client.config.debug)
				client.logger.debug(
					"All guild details are re-cached [ per 5 minutes ]"
				);
			const guildCache = client.guilds.cache;

			for (let i = 0; i < guildCache.length; i++) {
				const guild = guildCache[i];
				await guild.fetchDtls();
			}
		}, 300000);

		client.logger.ready("=-=-=-=-=- -=-=-=-=-= =-=-=-=-=- -=-=-=-=-=");
		client.logger.ready(
			`${client.user.tag} is up to help ${client.users.cache.size} people, in ${client.guilds.cache.size} servers!`
		);
		client.logger.ready(`${client.user.username} is ready to conquer!`);
		client.logger.ready("=-=-=-=-=- -=-=-=-=-= =-=-=-=-=- -=-=-=-=-=");
	}
};
