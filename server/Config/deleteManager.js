// external modules
const path = require("path");
let file = require("fs");

const deleteFile = async (req, res, next) => {
	if (
		req.currentUser.profile_img === "default-profile.png" ||
		req.currentUser.cover_img === "default-cover.png"
	) {
		next();
	} else {
		const whichOne = req.query.whichOne;

		const getFilePath =
			whichOne === "cover"
				? path.resolve(
						`../client/public/uploads/profile-img/${req.currentUser.cover_img}`
				  )
				: path.resolve(
						`../client/public/uploads/profile-img/${req.currentUser.profile_img}`
				  );

		// const getFilePath =
		// 	whichOne === "cover"
		// 		? `./build/uploads/profile-img/${req.currentUser.cover_img}`
		// 		: `./build/uploads/profile-img/${req.currentUser.profile_img}`;

		await file.unlink(getFilePath, (error) => {
			if (error) {
				next();
			} else {
				next();
			}
		});
	}
};

module.exports = { deleteFile };
