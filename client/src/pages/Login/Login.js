// external components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import "./Login.css";

const Login = () => {
	// for redirect sign-up page
	const Navigate = useNavigate();

	// for toggle password type
	const [typeT, setTypeT] = useState(false);

	// for get email or phone number
	const [email_phone, setEmail_phone] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async () => {
		if (!(email_phone && password)) {
			toast("Fill-up all fields!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
		} else {
			try {
				const userObject = {
					email_phone,
					password
				};
				const response = await fetch("/user/log-in", {
					method: "POST",
					body: JSON.stringify(userObject),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					});
					setTimeout(() => {
						return Navigate("/");
					}, 3000);

					setEmail_phone("");
					setPassword("");
				} else if (response.status === 400) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 3000
					});
				} else if (result.error) {
					toast.error(result.error, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		}
	};

	// when press enter key submit start
	const onKeyDown = (event) => {
		if (event.key === "Enter") {
			submitHandler();
		} else {
			return;
		}
	};
	// when press enter key submit end

	// set-up animation for when redirect signup page start
	const [rediSign, setRediSign] = useState("");

	useEffect(() => {
		if (rediSign) {
			setTimeout(() => {
				Navigate("/sign-up");
			}, 900);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rediSign]);
	// set-up animation for when redirect signup page end

	return (
		<>
			<div
				className="container-fluid p-0"
				id={rediSign ? "background-layer" : ""}
			>
				<div className="row m-0 login-container">
					<div
						className="col-lg-7 col-0 d-none d-lg-flex p-0 login-left"
						data-aos="fade-right"
						data-aos-duration="800"
						id={rediSign ? "when-signup" : ""}
					>
						<img
							src="/assets/images/login-image.gif"
							alt="login-img"
							className="img-fluid"
						/>
						<div
							className="signup-btn"
							data-aos="fade-down"
							data-aos-duration="800"
							data-aos-delay="500"
						>
							<div className="text">
								<span>New here?</span>
								<span>Join in and be a part of ESOLUMATE world.</span>
							</div>

							<button
								type="button"
								className="btn btn-dark"
								onClick={() => {
									setRediSign(!rediSign);
								}}
							>
								<span className="hover-link">Sign Up</span>
							</button>
						</div>
					</div>
					<div
						className="col-lg-5 col-12  p-0 login-right"
						id={rediSign ? "when-signup" : ""}
						data-aos="fade-left"
						data-aos-duration="800"
					>
						<div className="login-right-container">
							{/* title start  */}
							<div
								className="title"
								data-aos="fade-up"
								data-aos-duration="800"
								data-aos-delay="500"
							>
								<img
									src="/assets/logo/esoulmate-logo.png"
									alt="logo"
									className="img-fluid"
								/>
								<h4>ESOLUMATE</h4>
							</div>
							{/* title end  */}

							{/* input fields start  */}
							<div className="input-fields">
								<div className="required-field">
									<input
										type="text"
										placeholder="Email or Phone No..."
										onChange={(e) => setEmail_phone(e.target.value)}
										value={email_phone}
									/>
								</div>

								<div className="required-field">
									<input
										type={typeT ? "text" : "password"}
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										onKeyDown={onKeyDown}
									/>

									{/* for type toggle start  */}
									{password && (
										<span id="eye">
											{typeT ? (
												<i
													className="fa-solid fa-eye"
													onClick={() => setTypeT(!typeT)}
													style={{ color: "#6930c3" }}
												></i>
											) : (
												<i
													className="fa-solid fa-eye-slash"
													onClick={() => setTypeT(!typeT)}
												></i>
											)}
										</span>
									)}
									{/* for type toggle end  */}
								</div>
							</div>
							{/* input fields end  */}

							<div className="login-footer">
								<button
									type="button"
									className="btn btn-dark"
									onClick={submitHandler}
								>
									<span className="hover-link">Log In</span>
								</button>

								<div className="forget-password">
									<h6
										className="hover-link"
										onClick={() =>
											Navigate("/log-in/forget-password/find-account")
										}
									>
										Forget Password
									</h6>

									<h6
										className="hover-link"
										onClick={() => Navigate("../sign-up")}
									>
										Create new account
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
