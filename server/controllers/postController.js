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
				header,
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
		const document = await postModel
			.findOne({ user_id: req.params.profile_id })
			.populate("user_id", "name profile_img");

		if (document) {
			res.status(200).json(document);
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

module.exports = { changeProfile, profilePosts };
