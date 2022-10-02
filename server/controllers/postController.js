// external modules

// internal modules
const postModel = require("./../models/postModel");

// for changing cover or profile pic
const changeProfile = async (req, res) => {
	try {
		const { text, privacy, header } = req.body;
		const fileName = req.file.filename;

		const document = await postModel({
			user_id: req.currentUser._id,
			header,
			privacy,
			text,
			file_type: "image",
			attachment: fileName
		});

		if (header === "updated his cover photo.") {
			req.currentUser.cover_img = fileName;

			await req.currentUser.save();
			await document.save();

			res.status(200).json({ message: "Cover photo updated successfully." });
		} else {
			req.currentUser.profile_img = fileName;

			await req.currentUser.save();
			await document.save();

			res.status(200).json({ message: "Profile image updated successfully." });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for submitting post with attachment or without
const submitAttachments = async (req, res) => {
	try {
		const { text, privacy, category } = req.body;
		const fileName = req.file.filename;

		// for select file_type start
		const ext = fileName.split(".").slice(-1)[0];

		const selectType = () => {
			if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
				return "image";
			} else if (
				ext === "mp4" ||
				ext === "mov" ||
				ext === "wmv" ||
				ext === "avi" ||
				ext === "mkv" ||
				ext === "flv" ||
				ext === "mvk"
			) {
				return "video";
			} else if (ext === "mp3" || ext === "ogg" || ext === "WAV") {
				return "audio";
			} else if (ext === "pdf") {
				return "document";
			} else {
				throw new Error("Invalid File Extension");
			}
		};

		const file_type = await selectType();
		// for select file_type end

		const checkExist = await postModel.findOne({
			user_id: req.currentUser._id
		});

		if (checkExist) {
			checkExist.posts.push({
				category,
				privacy,
				text,
				attachment: fileName,
				file_type
			});

			await checkExist.save();
		} else {
			const document = await postModel({
				user_id: req.currentUser._id
			});

			document.posts.push({
				category,
				privacy,
				text,
				attachment: fileName
			});
			await document.save();
		}

		await req.currentUser.save();

		res.status(200).json({ message: "Upload successfully." });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for returning specific profile's all posts
const profilePosts = async (req, res) => {
	try {
		const document = await postModel
			.find({ user_id: req.params.profile_id })
			.populate("user_id", "name profile_img");

		console.log(document);

		if (document) {
			// res.status(200).json(document);
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for updating reaction
const updateReact = async (req, res) => {
	try {
		const { user_id, post_id, react } = req.body;

		await postModel.updateOne(
			{ user_id, "posts._id": post_id },
			{
				$push: {
					"posts.$.reaction": {
						react,
						user_id
					}
				}
			}
		);

		res.status(200).json({ message: "updated" });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for updating comment
const updateComment = async (req, res) => {
	try {
		const { user_id, post_id, comment } = req.body;

		await postModel.updateOne(
			{ user_id, "posts._id": post_id },
			{
				$push: {
					"posts.$.comments": {
						comment,
						user_id
					}
				}
			}
		);

		res.status(200).json({ message: "updated" });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for updating comment-reaction
const updateCommentReact = async (req, res) => {
	try {
		const { user_id, post_id, comments_id, react } = req.body;

		await postModel.updateOne(
			{ user_id },
			{
				$push: {
					"posts.$[outer].comments.$[inner].reaction": {
						react,
						user_id
					}
				}
			},
			{
				arrayFilters: [{ "outer._id": post_id }, { "inner._id": comments_id }]
			}
		);

		res.status(200).json({ message: "updated" });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

module.exports = {
	changeProfile,
	submitAttachments,
	profilePosts,
	updateReact,
	updateComment,
	updateCommentReact
};
