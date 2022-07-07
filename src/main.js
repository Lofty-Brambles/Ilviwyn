/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const Client = require("./structs/bot");

const Ilviwyn = new Client();

(async () => {
	const interactions = [
		"events",
		"commands",
		"context-menus",
		"buttons",
		"modals",
		"select-menus",
	];

	for (let index = 0; index < interactions.length; index++) {
		// eslint-disable-next-line no-await-in-loop
		await require(`handlers/${interactions[index]}`)(Ilviwyn);
	}

	const rest = new REST({ version: "10" }).setToken(Ilviwyn.config.token);
	const commandJSONdata = [
		...Array.from(Ilviwyn.slashCommands.values()).map(c => c.fetchData()),
		...Array.from(Ilviwyn.contextCommands.values()).map(c => c.fetchData()),
	];

	(async function register() {
		try {
			Ilviwyn.logger.log(
				"=-=-=-=-=- Loading Slash/Context commands to client -=-=-=-=-="
			);

			await rest.put(
				/**
				 * The below line is only for development.
				 * While deployment, please switch the commenting on the lines (1) and (2).
				 * Once the commands are deployed globally, please comment line (2) back, as it is no longer required to redeploy slash commands every restart
				 */
				Routes.applicationGuildCommands(
					Ilviwyn.config.clientID,
					Ilviwyn.config.testGuildID
				), // (`)
				// Routes.applicationGuildCommands(Ilviwyn.config.clientID), (2)

				{ body: commandJSONdata }
			);

			Ilviwyn.logger.log(
				"=-=-=-=-=- Successfully loaded Slash/Context commands -=-=-=-=-="
			);
		} catch (e) {
			Ilviwyn.logger.error(
				`Error while loading Slash/Context commands: ${e.message}`
			);
			if (Ilviwyn.config.debug) Ilviwyn.logger.debug(e);
		}
	})();

	Ilviwyn.mongoose.init(Ilviwyn);

	const { token } = Ilviwyn.config;
	Ilviwyn.login(token)
		.then(() => Ilviwyn.logger.ready("Ilviwyn is READY to conquer!"))
		.catch(e => Ilviwyn.logger.error(`Failed to log in - ${e}`));
})();

process.on("unhandledRejection", e => {
	Ilviwyn.logger.error(`Promise got rejected - ${e.message}`);
	if (Ilviwyn.config.debug) Ilviwyn.logger.debug(e);
});
