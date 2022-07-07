/* eslint-disable no-await-in-loop */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const readdir = require("util").promisify(require("fs").readdir);

module.exports = async client => {
	client.logger.log(
		"=-=-=-=-=- Slash Commands loading in collection... -=-=-=-=-="
	);
	let counter = 0;

	const cmdDir = (await readdir("./src/interactions/commands")).filter(
		(value, index, array) => array.indexOf(value) === index
	);

	for (let i = 0; i < cmdDir.length; i++) {
		const cmdFolder = cmdDir[i];

		const cmdFolders = (
			await readdir(`./src/interactions/commands/${cmdFolder}`)
		).filter((value, index, array) => array.indexOf(value) === index);

		for (let j = 0; j < cmdFolders.length; j++) {
			const cmdFile = cmdFolders[j];
			counter++;

			const cmd =
				await new (require(`../interactions/commands/${cmdFolder}/${cmdFile}`))(
					client
				);

			try {
				client.slashCommands.set(cmd.config.name, cmd);
			} catch (e) {
				client.logger.error(
					`Failed to load command: ${cmd.config.name} - ${e.message}`
				);
				if (client.config.debug) client.logger.debug(e);
			}

			client.logger.log(`Loaded Command: ${cmd.config.name}`);
		}
	}

	client.logger.log(
		`=-=-=-=-=- Slash commands loaded in Collection [${counter}] -=-=-=-=-=`
	);
};
