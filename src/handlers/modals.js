/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
const readdir = require("util").promisify(require("fs").readdir);

module.exports = async client => {
	client.logger.log("=-=-=-=-=- Modals loading... -=-=-=-=-=");
	let counter = 0;

	const modalDir = (await readdir("./src/interactions/modals")).filter(
		(value, index, array) => array.indexOf(value) === index
	);

	for (let i = 0; i < modalDir.length; i++) {
		const modalFolder = modalDir[i];

		const modalFolders = (
			await readdir(`./src/interactions/modals/${modalFolder}`)
		).filter((value, index, array) => array.indexOf(value) === index);

		for (let j = 0; j < modalFolders.length; j++) {
			const modalFile = modalFolders[j];
			counter++;

			const modal =
				require(`../interactions/modals/${modalFolder}/${modalFile}`)(
					client
				);

			try {
				client.modalCommands.set(modal.config.id, modal);
			} catch (e) {
				client.logger.log(
					`Failed to load modal: ${modal.config.id} - ${e.message}`
				);
				if (client.config.debug) client.logger.debug(e);
			}

			client.logger.log(`Loaded Modal: ${client.config.id}`);
		}
	}

	client.logger.log(`=-=-=-=-=- Modals loaded [${counter}] -=-=-=-=-=`);
};
