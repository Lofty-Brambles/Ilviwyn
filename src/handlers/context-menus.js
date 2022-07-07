/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
const readdir = require("util").promisify(require("fs").readdir);

module.exports = async client => {
	client.logger.log(
		"=-=-=-=-=- Context Menus loadting in Collection -=-=-=-=-="
	);
	let counter = 0;

	const cmenuDir = (await readdir("./src/interactions/context-menus")).filter(
		(value, index, array) => array.indexOf(value) === index
	);

	for (let i = 0; i < cmenuDir.length; i++) {
		const cmenuFolder = cmenuDir[i];

		const cmenuFolders = (
			await readdir(`./src/interactions/commands/${cmenuFolder}`)
		).filter((value, index, array) => array.indexOf(value) === index);

		for (let j = 0; j < cmenuFolders.length; j++) {
			const cmenuFile = cmenuFolders[j];
			counter++;

			const cmenu =
				require(`../interactions/context-menus/${cmenuFolder}/${cmenuFile}`)(
					client
				);

			try {
				client.contextCommands.set(cmenu.config.name, cmenu);
			} catch (e) {
				client.logger.log(
					`Failed to load context menu: ${cmenu.config.name} - ${e.message}`
				);
				if (client.config.debug) client.logger.debug(e);
			}

			client.logger.log(`Loaded Context Menu: ${cmenu.config.name}`);
		}
	}

	client.logger.log(
		`=-=-=-=-=- Context Menus loaded in Collection [${counter}] -=-=-=-=-=`
	);
};
