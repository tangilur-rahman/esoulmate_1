// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		user_id: {
			type: mongoose.Types.ObjectId,
			ref: "user"
		},

		posts: [
			{
				header: {
					type: String,
					trim: true
				},

				privacy: {
					type: String,
					trim: true
				},

				text: {
					type: String,
					trim: true
				},

				category: {
					type: String,
					trim: true
				},

				attachment: {
					type: String,
					trim: true
				},

				file_type: {
					type: String,
					trim: true
				},

				time: {
					type: Date,
					default: Date.now()
				}
			}
		]
	},
	{ timestamps: true }
);

const postModel = mongoose.model("post", schema);

module.exports = postModel;