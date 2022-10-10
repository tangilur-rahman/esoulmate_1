// external modules
const path = require("path");
let file = require("fs");

const deleteFile = async (req, res, next) => {
	const getFilePath = path.resolve(
		`../client/public/uploads/profile-img/${req.currentUser.profile_img}`
	);

	// const getFilePath = `./build/uploads/profile-img/${req.currentUser.profile_img}`;

	await file.unlink(getFilePath, (error) => {
		if (error) {
			next();
		} else {
			next();
		}
	});
};

module.exports = { deleteFile };
