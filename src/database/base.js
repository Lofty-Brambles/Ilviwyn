const mongo = require("mongoose");
const { hrtime } = require("node:process");

module.exports = {
	async init(bot) {
		const opts = {
			autoIndex: false,
			socketTimeoutMS: 15000,
			family: 4,
		};

		try {
			await mongo.connect(bot.config.mongoURL);
		} catch (e) {
			bot.logger.error(`Mongo wasn't able to connect - ${e.message}`);
			if (bot.config.debug) bot.logger.debug(e);
		}

		mongo.connection.on("connected", () => {
			bot.logger.ready(`Mongo successfully connected.`);
		});
		mongo.connection.on("disconnected", () => {
			bot.logger.error(`Mongo was disconnected.`);
		});
	},

	async pong() {
		const startTime = hrtime.bigint();
		await mongo.connection.db.command({ ping: 1 });
		const endTime = hrtime.bigint();
		return ((endTime - startTime) / Math.pow(10, 9)).toFixed(5);
	},
};
