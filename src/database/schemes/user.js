const { Schema, model } = require("mongoose");

const User = new Schema({
	userID: String,
});

module.exports = model("User", User);
