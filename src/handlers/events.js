/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { parse } = require("path");
const readdir = require("util").promisify(require("fs").readdir);

module.exports = async client => {
	client.logger.log("=-=-=-=-=- Events loading... -=-=-=-=-=");
	let counter = 0;

	const eventsDirectory = await readdir("./src/events");

	for (let i = 0; i < eventsDirectory.length; i++) {
		const folder = eventsDirectory[i];

		const folders = await require(`./src/events/${folder}`);

		for (let j = 0; j < folders.length; j++) {
			const file = folders[j];
			delete require.cache[file];
			const { name } = parse(file);
			counter++;

			const event = await new (require(`./../events/${folder}/${file}`))(
				client,
				name
			);

			try {
				if (event.config.once) {
					await client.once(
						name,
						...args => event.run(client, ...args)
					);
				} else {
					await client.on(
						name,
						// eslint-disable-next-line no-return-await
						async (...args) => await event.run(client, ...args)
					);
				}

				client.logger.log(`Loaded event: ${name}`);
			} catch (e) {
				client.logger.error(
					`Failed to load event: ${name} - ${e.message}`
				);
				if (client.config.debug) client.logger.debug(e);
			}
		}
	}

	client.logger.log(`=-=-=-=-=- Events loaded [${counter}]. -=-=-=-=-=`);
};
