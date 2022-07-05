/* eslint-disable no-console */
const {
	cyan,
	gray,
	yellow,
	magenta,
	whiteBright,
	greenBright,
} = require("chalk");
const { format } = require("date-fns");

const titlize = str => str[0].toUpperCase() + str.slice(1);

const logs = (content, type) => {
	const timestamp = `[ ${cyan(format(new Date(), "dd-MMM-yyyy p"))} ]`;

	switch (type) {
		case "log":
			console.log(`${timestamp} ${gray(titlize(type))} - ${content}`);
			break;
		case "warn":
			console.log(`${timestamp} ${yellow(titlize(type))} - ${content}`);
			break;
		case "debug":
			console.log(`${timestamp} ${magenta(titlize(type))} - ${content}`);
			break;
		case "cmd":
			console.log(
				`${timestamp} ${whiteBright(titlize(type))} - ${content}`
			);
			break;
		case "ready":
			console.log(
				`${timestamp} ${greenBright(titlize(type))} - ${content}`
			);
			break;
		default:
			break;
	}
};

exports = {
	log: (...args) => logs(args, "log"),
	warn: (...args) => logs(args, "warn"),
	debug: (...args) => logs(args, "debug"),
	cmd: (...args) => logs(args, "cmd"),
	ready: (...args) => logs(args, "ready"),
};
