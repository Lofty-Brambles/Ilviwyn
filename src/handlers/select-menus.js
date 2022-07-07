/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
const readdir = require("util").promisify(require("fs").readdir);

module.exports = async client => {
	client.logger.log("=-=-=-=-=- Select-menus loading... -=-=-=-=-=");
	let counter = 0;

	const smenuDir = (await readdir("./src/interactions/select-menus")).filter(
		(value, index, array) => array.indexOf(value) === index
	);

	for (let i = 0; i < smenuDir.length; i++) {
		const smenuFolder = smenuDir[i];

		const smenuFolders = (
			await readdir(`./src/interactions/select-menus/${smenuFolder}`)
		).filter((value, index, array) => array.indexOf(value) === index);

		for (let j = 0; j < smenuFolders.length; j++) {
			const smenuFile = smenuFolders[j];
			counter++;

			const smenu =
				require(`../interactions/selct-menus/${smenuFolder}/${smenuFile}`)(
					client
				);

			try {
				client.selectCommands.set(smenu.config.id, smenu);
			} catch (e) {
				client.logger.log(
					`Failed to load Select-menu: ${smenu.config.id} - ${e.message}`
				);
				if (client.config.debug) client.logger.debug(e);
			}

			client.logger.log(`Loaded Select-menu: ${client.config.id}`);
		}
	}

	client.logger.log(`=-=-=-=-=- Select-menus loaded [${counter}] -=-=-=-=-=`);
};
