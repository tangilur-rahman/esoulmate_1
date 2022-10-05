// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		account_type: {
			type: String,
			required: true,
			trim: true
		},
		name: {
			type: String,
			required: true,
			trim: true
		},

		email: {
			type: String,
			trim: true
		},

		phone: {
			type: String,
			trim: true
		},

		gender: {
			type: String,
			trim: true
		},

		password: {
			type: String,
			required: true,
			trim: true
		},

		profile_img: {
			type: String,
			default: "default-profile.png",
			trim: true
		},

		cover_img: {
			type: String,
			default: "default-cover.png",
			trim: true
		},

		date_of_birth: {
			type: String,
			trim: true
		},

		page_type: {
			type: String,
			trim: true
		}
	},
	{ timestamps: true }
);

const userModel = mongoose.model("user", schema);

module.exports = userModel;
