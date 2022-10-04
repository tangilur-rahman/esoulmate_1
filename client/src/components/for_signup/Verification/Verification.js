// external components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../for_forget_pass/Header/Header";

// internal components
import "./Verification.css";

const Verification = ({ getAddress }) => {
	// for redirect login page
	const Navigate = useNavigate();

	// for displaying error
	const [errDisplay, setErrDisplay] = useState("");

	// for displaying conform message
	const [conformDis, setConformDis] = useState("");

	// for loading until match with our otp
	const [isLoading, setIsLoading] = useState(false);

	// for getting otp code
	const [getCode, setCode] = useState("");

	// for checking user input email or phone start
	function isNumeric(value) {
		return /^\d+$/.test(value);
	}
	// for checking user input email or phone end

	// for checking opt is matching or not start
	const matchingOtpHandler = async () => {
		if (getCode) {
			try {
				setIsLoading(true);

				const response = await fetch(
					`/user/log-in/verification/otp/${getAddress.email_phone}/${getCode}`
				);

				await response.json();

				if (response.status === 200) {
					setConformDis(true);
				} else if (response.status === 400) {
					setErrDisplay(true);
					setIsLoading(false);
				} else {
					setErrDisplay(true);
					setIsLoading(false);
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setIsLoading(false);

				setTimeout(() => {
					return Navigate("/sign-up");
				}, 3000);
			}
		}
	};
	// for checking opt is matching or not end

	// when press enter key submit start
	const onKeyDown = (event) => {
		if (event.key === "Enter") {
			matchingOtpHandler();
		} else {
			return;
		}
	};
	// when press enter key submit end

	// for sending opt in selected email or phone start
	const sendOtpHandler = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`/user/sign-up/verification/${getAddress.email_phone}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setIsLoading(false);
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
	};
	// for sending opt in selected email or phone end

	return (
		<>
			<Header />
			<div className="row m-0 sign-verification-container">
				<div className="wrapper">
					<h4 className={errDisplay ? "reduce-opacity" : ""}>
						Enter security code
					</h4>
					<p id="message" className={errDisplay ? "reduce-opacity" : ""}>
						Let us know that this&nbsp;
						{isNumeric(getAddress.email_phone)
							? "phone number"
							: "email address"}
						&nbsp;belongs to you. Please check your &nbsp;
						{isNumeric(getAddress.email_phone) ? "phone" : "email"} for a
						message with your code. Your code is &nbsp;
						<span style={{ fontWeight: 700 }}>6 numbers</span> long.
					</p>

					{errDisplay && (
						<div className="error-message">
							<div id="header">Wrong Security Code</div>
							<div id="message">
								Wrong Security code. Try again with right one.
							</div>

							<div id="ok-btn">
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => setErrDisplay(false)}
								>
									<span className="hover-link">Ok</span>
								</button>
							</div>
						</div>
					)}

					{conformDis && (
						<div className="conform-message">
							<div id="header">Account Confirmed</div>
							<div id="message">
								You have successfully confirmed your account with the&nbsp;
								{isNumeric(getAddress.email_phone)
									? `phone number `
									: `email address `}
								<b>
									{isNumeric(getAddress.email_phone)
										? `${getAddress.email_phone} .`
										: `${getAddress.email_phone} .`}
								</b>
								<br /> You will use this&nbsp;
								{isNumeric(getAddress.email_phone)
									? `phone number `
									: `email address `}
								&nbsp;to log in.
							</div>

							<div id="ok-btn">
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => {
										setConformDis(false);
										getAddress.submitHandle();
									}}
								>
									<span className="hover-link">Ok</span>
								</button>
							</div>
						</div>
					)}

					{!(errDisplay || conformDis) && (
						<>
							<div className="selection">
								<div className="left">
									<input
										type="number"
										placeholder="Security Code"
										onChange={(e) => setCode(e.target.value)}
										value={getCode}
										onKeyDown={onKeyDown}
									/>
								</div>
								<div className="right">
									<p>
										We sent your code to: <br />
										<span>{getAddress.email_phone}</span>
									</p>
								</div>
							</div>
							<div className="footer-btn-container">
								<span className="hover-link" onClick={sendOtpHandler}>
									Didn’t get a code?
								</span>

								<div className="btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => Navigate("/sign-up")}
									>
										<span
											className="hover-link"
											style={{ display: "inline-block" }}
										>
											Cancel
										</span>
									</button>

									<button
										type="button"
										className="btn btn-primary "
										onClick={matchingOtpHandler}
									>
										{!isLoading ? (
											<span
												className="hover-link"
												style={{ display: "inline-block" }}
											>
												Continue
											</span>
										) : (
											<i className="fa-solid fa-spinner fa-spin"></i>
										)}
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Verification;
