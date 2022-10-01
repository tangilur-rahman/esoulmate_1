// external modules
const post = require("express").Router();

// internal modules
const authUser = require("./../middleware/authUser");
const { multerForImg } = require("./../Config/multerManager");
const {
	changeProfile,
	profilePosts,
	updateReact,
	updateComment,
	updateCommentReact
} = require("./../controllers/postController");

// for changing cover & profile-photo
const upload = multerForImg("file");

post.post("/profile", authUser, upload.single("file"), changeProfile);

// for returning specific profile's all posts
post.get("/profile/:profile_id", authUser, profilePosts);

// for updating reaction
post.post("/react", updateReact);

// for updating comment
post.post("/comment", updateComment);

// for updating comment-reaction
post.post("/comment/react", updateCommentReact);

module.exports = post;
