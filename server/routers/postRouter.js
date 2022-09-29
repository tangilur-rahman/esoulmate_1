// external modules
const post = require("express").Router();

// internal modules
const authUser = require("./../middleware/authUser");
const { multerForImg } = require("./../Config/multerManager");
const {
	changeProfile,
	profilePosts,
	updateReact
} = require("./../controllers/postController");

// for changing cover & profile-photo
const upload = multerForImg("file");

post.post("/profile", authUser, upload.single("file"), changeProfile);

// for returning specific profile's all posts
post.get("/profile/:profile_id", authUser, profilePosts);

// for updating reaction
post.post("/react", updateReact);

module.exports = post;
