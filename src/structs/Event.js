const { sep } = require("path");

module.exports = class Event {
	constructor(client, name, { dir = false }) {
		const pathArr = dir.split(sep);
		this.config = {
			name,
			once: false,
			category: dir ? pathArr[parseInt(pathArr.length - 1, 10)] : "Misc",
		};
	}

	/**
	 * Extended function for catching unhandled events
	 * @param { Object } bot - The bot client
	 * @param { Object } message - Properties of the message that ran the command
	 */
	// eslint-disable-next-line no-unused-vars
	async run(...args) {
		throw new Error(`${this.config.name} Event - No runtime detected.`);
	}
};
