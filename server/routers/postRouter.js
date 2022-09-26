// external modules
const post = require("express").Router();

// internal modules
const authUser = require("./../middleware/authUser");
const { multerForImg } = require("./../Config/multerManager");
const { changeProfile } = require("./../controllers/postController");

// for changing cover & profile-photo
const upload = multerForImg("file");

post.post("/profile", authUser, upload.single("file"), changeProfile);

module.exports = post;
