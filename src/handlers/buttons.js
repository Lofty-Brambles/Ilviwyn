/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
const readdir = require("util").promisify(require("fs").readdir);

module.exports = async client => {
	client.logger.log("=-=-=-=-=- Buttons loading... -=-=-=-=-=");
	let counter = 0;

	const btnDir = (await readdir("./src/interactions/buttons")).filter(
		(value, index, array) => array.indexOf(value) === index
	);

	for (let i = 0; i < btnDir.length; i++) {
		const btnFolder = btnDir[i];

		const btnFolders = (
			await readdir(`./src/interactions/buttons/${btnFolder}`)
		).filter((value, index, array) => array.indexOf(value) === index);

		for (let j = 0; j < btnFolders.length; j++) {
			const btnFile = btnFolders[j];
			counter++;

			const btn =
				require(`../interactions/buttons/${btnFolder}/${btnFile}`)(
					client
				);

			try {
				client.buttonCommands.set(btn.config.id, btn);
			} catch (e) {
				client.logger.log(
					`Failed to load button: ${btn.config.id} - ${e.message}`
				);
				if (client.config.debug) client.logger.debug(e);
			}

			client.logger.log(`Loaded Button: ${client.config.id}`);
		}
	}

	client.logger.log(`=-=-=-=-=- Buttons loaded [${counter}] -=-=-=-=-=`);
};
