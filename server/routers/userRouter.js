// external modules
const user = require("express").Router();

// internal modules
const {
	signUp,
	LogIn,
	searchingAccount,
	sendOtpLogIn,
	sendOtpSignUp,
	matchingOtp,
	resetPassword,
	currentUser,
	getProfile
} = require("./../controllers/userController");
const authUser = require("./../middleware/authUser");

// for returning current-user
user.get("/", authUser, currentUser);

// for returning selected profile page
user.get("/:profile_id", authUser, getProfile);

// for signup new user
user.post("/sign-up", signUp);

// for login user
user.post("/log-in", LogIn);

// for getting searching-account
user.get("/log-in/searching/:account", searchingAccount);

// for sending otp when log-in
user.get("/log-in/verification/:selected", sendOtpLogIn);

// for sending otp when sign-up
user.get("/sign-up/verification/:selected", sendOtpSignUp);

// for getting & matching otp
user.get("/log-in/verification/otp/:selectedVia/:getCode", matchingOtp);

// for reset-password
user.get("/log-in/reset-password/:email_phone/:newPassword", resetPassword);

module.exports = user;
