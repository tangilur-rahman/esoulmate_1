// external modules
const post = require("express").Router();

// internal modules
const authUser = require("./../middleware/authUser");
const {
	multerForImg,
	multerForAttachment
} = require("./../Config/multerManager");
const {
	changeProfile,
	submitPost,
	profilePosts,
	updateReact,
	updateComment,
	updateCommentReact
} = require("./../controllers/postController");

// for changing cover & profile-photo
const uploadImg = multerForImg("file");

post.post("/profile", authUser, uploadImg.single("file"), changeProfile);

// for submitting post with attachment or without
const uploadAtt = multerForAttachment("file");

post.post("/attachment", authUser, uploadAtt.single("file"), submitPost);

// for returning specific profile's all posts
post.get("/profile/:profile_id", authUser, profilePosts);

// for updating reaction
post.post("/react", updateReact);

// for updating comment
post.post("/comment", updateComment);

// for updating comment-reaction
post.post("/comment/react", updateCommentReact);

module.exports = post;
