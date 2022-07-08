const Event = require("../../structs/Event");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, { dir: __dirname });
	}

	// eslint-disable-next-line class-methods-use-this
	async run( client, info ) {
		client.logger.warn(`A warning was provided: ${info}`);
	}
};