// external modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// for twilio start
const sid = "ACa569254d3f3ec2b861ecb8d208011b09";
const auth_token = "e4237598a0b7951e437b14ea69609681";

const twilio = require("twilio")(sid, auth_token);
// for twilio end

// internal modules
const userModel = require("./../models/userModel");
const otpModel = require("./../models/otpModel");

// for returning current-user
const currentUser = (req, res) => {
	try {
		res.status(200).json(req.currentUser);
	} catch (error) {
		res.status(500).json("Invalid Account");
	}
};

// for returning selected profile
const getProfile = async (req, res) => {
	try {
		const document = await userModel.findOne({ _id: req.params.profile_id });

		if (document) {
			res.status(200).json(document);
		} else {
			res.status(400).json({ error: "That account didn't exist any more!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

//  for sing-up user
const signUp = async (req, res) => {
	const {
		f_name,
		l_name,
		email_phone,
		password,
		c_password,
		gender,
		day,
		month,
		year
	} = req.body;

	try {
		// check Email Already Exists or not
		const checkEmail = await userModel.findOne({ email: email_phone });

		// check Phone Number Already Exists or not
		let checkPhone;
		if (!checkEmail) {
			checkPhone = await userModel.findOne({ phone: email_phone });
		}

		if (checkEmail || checkPhone) {
			if (checkEmail) {
				res.status(400).json({ error: "That email already used!" });
			} else if (checkPhone) {
				res.status(400).json({ error: "That phone already used!" });
			}
		} else {
			// check password match or not
			if (password === c_password) {
				if (password.length < 8) {
					res.status(400).json({ error: "Password length is too short! " });
				} else {
					// hash password
					const hashPassword = await bcrypt.hash(password, 10);

					// email validate
					function validateEmail(email) {
						var emailRegex =
							/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
						return emailRegex.test(email);
					}

					const email = validateEmail(email_phone) ? email_phone : "";
					const phone = validateEmail(email_phone) ? "" : email_phone;

					if (phone) {
						if (phone.length < 8 || !/^[0-9]+$/.test(phone)) {
							throw new Error("Invalid Phone Number!");
						}
					}

					const document = await userModel({
						name: `${f_name} ${l_name}`,
						email: email,
						phone: phone,
						password: hashPassword,
						gender,
						date_of_birth: `${day}-${month}-${year}`
					});

					await document.save();

					// create token start
					const token = await jwt.sign(
						{ _id: document._id },
						process.env.SECRET_KEY,
						{ expiresIn: "365d" }
					);

					res.cookie(process.env.COOKIES_NAME, token, {
						expires: new Date(Date.now() + 31556952000)
					});
					// create token end

					res.status(200).json({ message: `Welcome ${f_name} ${l_name} ❤️` });
				}
			} else {
				res.status(400).json({ error: "Password didn't match!" });
			}
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

//  for login user
const LogIn = async (req, res) => {
	const { email_phone, password } = req.body;

	try {
		const checkExist = await userModel.findOne({
			$or: [{ email: email_phone }, { phone: email_phone }]
		});

		if (checkExist) {
			const comparePassword = await bcrypt.compare(
				password,
				checkExist.password
			);

			if (comparePassword) {
				// create token start
				const token = await jwt.sign(
					{ _id: checkExist._id },
					process.env.SECRET_KEY,
					{ expiresIn: "365d" }
				);

				res.cookie(process.env.COOKIES_NAME, token, {
					expires: new Date(Date.now() + 31556952000)
				});
				// create token end

				res.status(200).json({ message: `Welcome ${checkExist.name} ❤️` });
			} else {
				res.status(400).json({ error: "Authentication Failed!" });
			}
		} else {
			res.status(400).json({ error: "Invalid Account!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for getting searching account
const searchingAccount = async (req, res) => {
	try {
		const document = await userModel.findOne({
			$or: [{ email: req.params.account }, { phone: req.params.account }]
		});

		if (document) {
			res.status(200).json(document);
		} else {
			res.status(400).json({ error: "Account not found!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for sending otp
const sendOtp = async (req, res) => {
	try {
		const selected = req.params.selected;

		// check Email Already Exists or not
		const checkEmail = await userModel.findOne({ email: selected });

		// check Phone Number Already Exists or not
		let checkPhone;
		if (!checkEmail) {
			checkPhone = await userModel.findOne({ phone: selected });
		}

		if (checkEmail || checkPhone) {
			const createOtp = Math.floor(Math.random() * 1000000 + 1);

			const expireIn = new Date().getTime() + 300 * 1000;

			const checkExist = await otpModel.findOne({ email_phone: selected });

			if (checkExist) {
				checkExist.code = createOtp;
				checkExist.expireIn = expireIn;

				await checkExist.save();
			} else {
				const document = await otpModel({
					email_phone: selected,
					code: createOtp,
					expireIn
				});

				await document.save();
			}

			if (checkEmail) {
				// for sending email start
				let transporter = nodemailer.createTransport({
					service: "gmail",
					// host: "smtp.ethereal.email",
					port: 587,
					secure: false, // true for 465, false for other ports
					auth: {
						user: "mohammadtangilurrahaman@gmail.com", // generated ethereal user
						pass: "ahhqpefxdjbzahwe" // generated ethereal password
					}
				});

				// send mail with defined transport object
				await transporter.sendMail({
					from: "mohammadtangilurrahaman@gmail.com", // sender address
					to: `${selected}`, // list of receivers
					subject: "ESOULMATE, Reset Password", // Subject line
					text: "hello",
					html: `<p style="font-size : 18px"}}>
				Hey there, Someone requested a new password for your 
				<span style="color : blue">Esoulmate</span>  account.
				 
				<br/> <br/>
					Code:
					<span style="font-size : 20px; font-weight: 600; color : blue"> &nbsp;
						${createOtp}
					</span>
				

				<p style="font-size : 17px;">This password reset code is only valid for the next 5 minutes</p>
				If you didn’t make this request, then you can ignore this email 🙂
			</p>`
				});
				// for sending email end

				res.status(200).json({ message: "OTP sended to your email" });
			} else if (checkPhone) {
				await twilio.messages.create({
					from: "+19289165450",
					to: `+88${selected}`,
					body: `Esoulmate,verification code is ${createOtp}`
				});

				res.status(200).json({ message: "OTP sended to your phone" });
			}
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for getting & matching otp
const matchingOtp = async (req, res) => {
	try {
		const { selectedVia, getCode } = req.params;

		const document = await otpModel.findOne({
			email_phone: selectedVia,
			code: getCode
		});

		if (document) {
			if (document.expireIn > new Date().getTime()) {
				res.status(200).json(document);
			} else {
				res.status(400).json({ error: "That OTP was Expired!" });
			}
		} else {
			res.status(400).json({ error: "OTP didn't match" });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for reset-password
const resetPassword = async (req, res) => {
	try {
		const { email_phone, newPassword } = req.params;

		const foundDoc = await userModel.findOne({
			$or: [{ email: email_phone }, { phone: email_phone }]
		});

		if (foundDoc) {
			// hash password
			const hashPassword = await bcrypt.hash(newPassword, 10);

			foundDoc.password = hashPassword;

			await foundDoc.save();

			res.status(200).json({ message: "Password update successfully" });
		} else {
			res.status(500).json({ error: "Maintenance mode, Try again later!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

module.exports = {
	currentUser,
	getProfile,
	signUp,
	LogIn,
	searchingAccount,
	sendOtp,
	matchingOtp,
	resetPassword
};
