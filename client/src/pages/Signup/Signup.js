// external components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import SignFieldsPage from "../../components/for_signup/SignFieldsPage/SignFieldsPage";
import SignFieldsPeople from "../../components/for_signup/SignFieldsPeople/SignFieldsPeople";
import "./Signup.css";

const Signup = ({ setAddress }) => {
	// for redirect login page
	const Navigate = useNavigate();

	// for loading until match with our otp
	const [isLoading, setIsLoading] = useState(false);

	// for getting registration type
	const [regType, setRegType] = useState("people");

	// for checked-box check mark
	const [checked, setChecked] = useState("");

	const [getDay, setDay] = useState("");
	const [getMonth, setMonth] = useState("");
	const [getYear, setYear] = useState("");
	const [getGender, setGender] = useState("");

	const [user, setUser] = useState({
		f_name: "",
		l_name: "",
		email_phone: "",
		password: "",
		c_password: "",
		gender: "",
		day: "",
		month: "",
		year: ""
	});

	const { f_name, l_name, email_phone, password, c_password } = user;

	// for get input field's values
	const onChangeHandler = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	// submit-handler start
	const submitHandle = async () => {
		try {
			const userObj = {
				f_name,
				l_name,
				email_phone: email_phone || email_phoneP,
				password: password || passwordP,
				gender: getGender,
				day: getDay,
				month: getMonth,
				year: getYear,
				page_name: getPName,
				page_type: getPType,
				account_type: regType
			};

			const response = await fetch("/user/sign-up", {
				method: "POST",
				body: JSON.stringify(userObj),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const result = await response.json();

			if (response.status === 200) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setIsLoading(false);

				setTimeout(() => {
					return Navigate("/");
				}, 3000);
			} else if (response.status === 400) {
				toast(result.error, {
					position: "top-right",
					theme: "dark",
					autoClose: 2500
				});
				setIsLoading(false);
				setTimeout(() => {
					return Navigate("/sign-up");
				}, 3000);
			} else {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setIsLoading(false);
				setTimeout(() => {
					return Navigate("/sign-up");
				}, 3000);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);

			return Navigate("/sign-up");
		}
	};
	// submit-handler end

	// for sending opt in selected email or phone start
	const sendOtpHandler = async () => {
		setIsLoading(true);
		if (regType === "people") {
			if (
				!(
					f_name &&
					l_name &&
					email_phone &&
					password &&
					c_password &&
					getGender &&
					getDay &&
					getMonth &&
					getYear
				)
			) {
				toast("Fill-up all fields!", {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
				setIsLoading(false);
			} else {
				if (!checked) {
					toast("Do you agree the terms of service & privacy policy?", {
						position: "top-right",
						theme: "dark",
						autoClose: 4000
					});
					setIsLoading(false);
				} else {
					if (!(password === c_password)) {
						toast("Password didn't match!", {
							position: "top-right",
							theme: "dark",
							autoClose: 4000
						});
						setIsLoading(false);
					} else {
						try {
							const response = await fetch(
								`/user/sign-up/verification/${email_phone}`
							);

							const result = await response.json();

							if (response.status === 200) {
								toast.success(result.message, {
									position: "top-right",
									theme: "colored",
									autoClose: 2000
								});

								setAddress({ email_phone, submitHandle });

								setTimeout(() => {
									return Navigate("/sign-up/verification");
								}, 2500);
							} else if (result.error) {
								toast(result.error, {
									position: "top-right",
									theme: "dark",
									autoClose: 3000
								});
								setIsLoading(false);
							}
						} catch (error) {
							toast.error(error.message, {
								position: "top-right",
								theme: "colored",
								autoClose: 3000
							});
							setIsLoading(false);

							return Navigate("/sign-up");
						}
					}
				}
			}
		} else if (regType === "page") {
			if (!(getPName && email_phoneP && getPType && passwordP && c_passwordP)) {
				toast("Fill-up all fields!", {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
				setIsLoading(false);
			} else {
				if (!checked) {
					toast("Do you agree the terms of service & privacy policy?", {
						position: "top-right",
						theme: "dark",
						autoClose: 4000
					});
					setIsLoading(false);
				} else {
					if (!(passwordP === c_passwordP)) {
						toast("Password didn't match!", {
							position: "top-right",
							theme: "dark",
							autoClose: 4000
						});
						setIsLoading(false);
					} else {
						try {
							const response = await fetch(
								`/user/sign-up/verification/${email_phoneP}`
							);

							const result = await response.json();

							if (response.status === 200) {
								toast.success(result.message, {
									position: "top-right",
									theme: "colored",
									autoClose: 2000
								});

								setAddress({
									email_phone: email_phone || email_phoneP,
									submitHandle
								});

								setTimeout(() => {
									return Navigate("/sign-up/verification");
								}, 2500);
							} else if (result.error) {
								toast(result.error, {
									position: "top-right",
									theme: "dark",
									autoClose: 3000
								});
								setIsLoading(false);
							}
						} catch (error) {
							toast.error(error.message, {
								position: "top-right",
								theme: "colored",
								autoClose: 3000
							});
							setIsLoading(false);

							return Navigate("/sign-up");
						}
					}
				}
			}
		}
	};
	// for sending opt in selected email or phone end

	// for page registration start
	// for getting page-name
	const [getPName, setPName] = useState("");

	// for getting page email_phone
	const [email_phoneP, setEmail_phoneP] = useState("");

	// for getting page-type
	const [getPType, setPType] = useState("");

	// for getting page password
	const [passwordP, setPasswordP] = useState("");

	// for getting page c_password
	const [c_passwordP, setC_PasswordP] = useState("");
	// for page registration end

	// when registration type toggle start
	useEffect(() => {
		if (regType) {
			setUser({
				f_name: "",
				l_name: "",
				email_phone: "",
				password: "",
				c_password: "",
				gender: "",
				day: "",
				month: "",
				year: ""
			});

			setPName("");
			setEmail_phoneP("");
			setPType("");
			setPasswordP("");
			setC_PasswordP("");
		}
	}, [regType]);
	// when registration type toggle end

	return (
		<>
			<div className="container-fluid p-0">
				<div className="row m-0 sign-container">
					{/* left side start  */}
					<div
						className="col-12 col-xl-5 p-0 sign-input"
						data-aos="fade-left"
						data-aos-duration="800"
						data-aos-delay="600"
					>
						{/* title start  */}
						<div className="title">
							<img
								src="/assets/logo/esoulmate-logo.png"
								alt="logo"
								className="img-fluid"
								data-aos="fade-down"
								data-aos-duration="800"
								data-aos-delay="800"
							/>
							<h4>Sign Up</h4>
						</div>
						{/* title end  */}

						<table>
							<tr className="registration-type">
								<td className="selected" onClick={() => setRegType("people")}>
									<input
										value="People"
										readOnly
										id={regType === "people" ? "active" : ""}
									/>
								</td>
								<td className="selected" onClick={() => setRegType("page")}>
									<input
										value="Page"
										readOnly
										id={regType === "page" ? "active" : ""}
									/>
								</td>
							</tr>
						</table>

						{regType === "people" ? (
							<SignFieldsPeople
								onChangeHandler={onChangeHandler}
								f_name={f_name}
								l_name={l_name}
								email_phone={email_phone}
								password={password}
								c_password={c_password}
								getDay={getDay}
								getMonth={getMonth}
								getYear={getYear}
								setDay={setDay}
								setMonth={setMonth}
								setYear={setYear}
								getGender={getGender}
								setGender={setGender}
							/>
						) : (
							<SignFieldsPage
								getPName={getPName}
								setPName={setPName}
								email_phoneP={email_phoneP}
								setEmail_phoneP={setEmail_phoneP}
								getPType={getPType}
								setPType={setPType}
								passwordP={passwordP}
								setPasswordP={setPasswordP}
								c_passwordP={c_passwordP}
								setC_PasswordP={setC_PasswordP}
							/>
						)}

						{/* footer start  */}
						<div className="sign-footer">
							<div className="checked">
								<input
									type="checkbox"
									id="checked"
									value="true"
									onClick={() => setChecked(!checked)}
								/>
								<label htmlFor="checked">
									I accept the <span>Terms of service</span>&nbsp; & &nbsp;
									<span>Privacy Policy</span>
								</label>
							</div>
							<div className="sign-btn" onClick={sendOtpHandler}>
								<button type="button">
									{!isLoading ? (
										<span
											className="hover-link"
											style={{ display: "inline-block" }}
										>
											Sign Up
										</span>
									) : (
										<i className="fa-solid fa-spinner fa-spin"></i>
									)}
								</button>
							</div>

							<h6
								id="have-account"
								onClick={() => Navigate("../log-in")}
								className="hover-link"
							>
								I have an account.
							</h6>
						</div>
						{/* footer end  */}
					</div>
					{/* left side end  */}

					{/* right side start  */}
					<div
						className="col-7 d-xl-flex d-none  p-0 sign-img"
						data-aos="fade-left"
						data-aos-duration="600"
					>
						{regType === "people" ? (
							<img
								src="/assets/images/signup-image.gif"
								alt="sign-people-img"
								className="img-fluid"
								id="when-people"
								data-aos="fade-down"
								data-aos-duration="800"
								data-aos-delay="500"
							/>
						) : (
							<img
								src="/assets/images/signup-page.gif"
								alt="sign-page-img"
								className="img-fluid"
								id="when-page"
								data-aos="fade-down"
								data-aos-duration="800"
								data-aos-delay="500"
							/>
						)}

						<button
							type="button"
							className="btn btn-dark"
							id={regType === "people" ? "when-people-btn" : "when-page-btn"}
							onClick={() => Navigate("../log-in")}
							data-aos="fade-up"
							data-aos-duration="800"
							data-aos-delay="600"
						>
							<span className="hover-link">Log In</span>
						</button>
					</div>
					{/* right side end  */}
				</div>
			</div>
		</>
	);
};

export default Signup;
