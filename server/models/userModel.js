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

		email_privacy: {
			type: String,
			trim: true,
			default: "Public"
		},

		phone: {
			type: String,
			trim: true
		},

		phone_privacy: {
			type: String,
			trim: true,
			default: "Public"
		},

		gender: {
			type: String,
			trim: true
		},

		gender_privacy: {
			type: String,
			trim: true,
			default: "Public"
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

		date_of_birth_privacy: {
			type: String,
			trim: true,
			default: "Public"
		},

		page_type: {
			type: String,
			trim: true
		},
		featured: [
			{
				img: String
			}
		],
		interested: Array,

		work: [
			{
				company: String,
				position: String,
				city: String,
				description: String,
				fromYear: Number,
				fromMonth: String,
				fromDay: Number,
				toYear: Number,
				toMonth: String,
				toDay: Number
			}
		],

		university: [
			{
				university_name: String,
				major: String,
				location: String,
				description: String,
				fromYear: Number,
				fromMonth: String,
				fromDay: Number,
				toYear: Number,
				toMonth: String,
				toDay: Number
			}
		],

		college: [
			{
				college_name: String,
				location: String,
				description: String,
				fromYear: Number,
				fromMonth: String,
				fromDay: Number,
				toYear: Number,
				toMonth: String,
				toDay: Number
			}
		],

		school: [
			{
				school_name: String,
				location: String,
				description: String,
				fromYear: Number,
				fromMonth: String,
				fromDay: Number,
				toYear: Number,
				toMonth: String,
				toDay: Number
			}
		],

		hometown: {
			city: {
				type: String,
				default: ""
			},
			country: {
				type: String,
				default: ""
			}
		},

		current_city: {
			city: {
				type: String,
				default: ""
			},
			country: {
				type: String,
				default: ""
			}
		},

		languages: Array,

		religion: {
			religion_name: String,
			privacy: {
				type: String,
				default: "Public"
			}
		},

		nicknames: [
			{
				nickname: String
			}
		],

		quotations: [
			{
				quote: String
			}
		],

		details: {
			type: String,
			trim: true
		},

		username: {
			type: String,
			trim: true,
			default: ""
		}
	},
	{ timestamps: true }
);

const userModel = mongoose.model("user", schema);

module.exports = userModel;
