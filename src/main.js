/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const Client = require("./structs/bot");

const Ilviwyn = new Client();

(async () => {
	const interactions = [
		"events",
		"commands", // TODO
		"context-menus", // TODO
		"buttons", // TODO
		"modals", // TODO
		"select-menus", // TODO
	];

	for (let index = 0; index < interactions.length; index++) {
		// eslint-disable-next-line no-await-in-loop
		await require(`handlers/${interactions[index]}`)(Ilviwyn);
	}

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
