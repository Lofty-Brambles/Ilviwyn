const Event = require("../../structs/Event");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, { dir: __dirname });
	}

	// eslint-disable-next-line class-methods-use-this
	async run(client, e) {
		client.logger.error(`An error was encountered: ${e.message}`);
		if (client.config.debug) client.logger.debug(e);
	}
};
