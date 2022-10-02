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
					trim: true,
					default: ""
				},

				privacy: {
					type: String,
					trim: true
				},

				text: {
					type: String,
					trim: true,
					default: ""
				},

				category: {
					type: String,
					trim: true,
					default: ""
				},

				attachment: {
					type: String,
					trim: true,
					default: ""
				},

				file_type: {
					type: String,
					trim: true,
					default: ""
				},

				time: {
					type: Date,
					default: Date.now
				},

				reaction: [
					{
						react: String,
						user_id: {
							type: mongoose.Types.ObjectId,
							ref: "user"
						}
					}
				],

				comments: [
					{
						comment: {
							type: String,
							trim: true
						},
						user_id: {
							type: mongoose.Types.ObjectId,
							ref: "user"
						},
						reaction: [
							{
								react: String,
								user_id: {
									type: mongoose.Types.ObjectId,
									ref: "user"
								}
							}
						],

						replays: [
							{
								comment: {
									type: String,
									trim: true
								},
								user_id: {
									type: mongoose.Types.ObjectId,
									ref: "user"
								},
								reaction: [
									{
										react: String,
										user_id: {
											type: mongoose.Types.ObjectId,
											ref: "user"
										}
									}
								]
							}
						]
					}
				]
			}
		]
	},
	{ timestamps: true }
);

const postModel = mongoose.model("post", schema);

module.exports = postModel;
