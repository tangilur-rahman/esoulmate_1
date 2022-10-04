// external components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import "./Verification.css";

const Verification = ({ selectedVia, setIsMatch }) => {
	// for redirect login page
	const Navigate = useNavigate();

	// for x-mark toggle
	const [errorT, setErrorT] = useState("");

	useEffect(() => {
		if (errorT) {
			setTimeout(() => {
				setErrorT(false);
			}, 10000);
		}
	}, [errorT]);

	// for loading until match with our otp
	const [isLoading, setIsLoading] = useState(false);

	// for getting otp code
	const [getCode, setCode] = useState("");

	// for checking opt is matching or not start
	const matchingOtpHandler = async () => {
		if (getCode) {
			try {
				setIsLoading(true);

				const response = await fetch(
					`/user/log-in/verification/otp/${selectedVia}/${getCode}`
				);

				const result = await response.json();

				if (response.status === 200) {
					toast.success("OTP Matched", {
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					});

					setIsMatch(result ? result : "");
					setIsLoading(false);

					setTimeout(() => {
						return Navigate("../reset-password");
					}, 3000);
				} else if (response.status === 400) {
					setErrorT(true);
					setIsLoading(false);
				} else {
					setErrorT(true);
					setIsLoading(false);
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setErrorT(true);
				setIsLoading(false);
				setTimeout(() => {
					return Navigate("../find-account");
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
			const response = await fetch(`/user/log-in/verification/${selectedVia}`);

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

			return Navigate("../find-account");
		}
	};
	// for sending opt in selected email or phone end

	// for checking selection is email or phone start
	function isNumeric(value) {
		return /^\d+$/.test(value);
	}
	// for checking selection is email or phone end

	return (
		<>
			<div className="row m-0 verification-container">
				<div className="wrapper">
					<h4>Enter security code</h4>
					<p id="message">
						Please check your {isNumeric(selectedVia) ? "phone" : "email"} for a
						message with your code. Your code is &nbsp;
						<span style={{ fontWeight: 700 }}>6 numbers</span> long.
					</p>

					{errorT && (
						<div className="not-match-message">
							<span>
								<img src="/assets/logo/xmark.png" alt="xmark" />
							</span>
							<p>
								The number that you've entered doesn't match your code. Please
								try again.
							</p>
						</div>
					)}

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
								<span>{selectedVia}</span>
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
								onClick={() => Navigate("/log-in")}
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
								className="btn btn-primary"
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
				</div>
			</div>
		</>
	);
};

export default Verification;
