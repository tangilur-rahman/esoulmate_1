// external modules

// internal modules
const postModel = require("./../models/postModel");

// for changing cover or profile pic
const changeProfile = async (req, res) => {
	try {
		const { text, privacy } = req.body;
		const fileName = req.file.filename;
		const type = req.query.type;

		const header =
			type === "cover"
				? "updated his cover photo."
				: "updated his profile picture.";

		const checkExist = await postModel.findOne({ id: req.currentUser._id });

		if (checkExist) {
			checkExist.posts.push({
				header,
				privacy,
				text,
				attachment: fileName
			});

			await checkExist.save();
		} else {
			const document = await postModel({
				id: req.currentUser._id
			});

			document.posts.push({
				header,
				privacy,
				text,
				attachment: fileName
			});
			await document.save();
		}

		if (type === "cover") {
			req.currentUser.cover_img = fileName;

			await req.currentUser.save();

			res.status(200).json({ message: "Cover photo updated successfully." });
		} else if (type === "profile") {
			req.currentUser.profile_img = fileName;

			await req.currentUser.save();

			res.status(200).json({ message: "Profile image updated successfully." });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for returning specific profile's all posts
const profilePosts = async (req, res) => {
	try {
		// const documents =
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

module.exports = { changeProfile, profilePosts };
