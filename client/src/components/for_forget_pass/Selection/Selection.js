// external components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import "./Selection.css";

const Selection = ({ foundAcc, selectedVia, setSelectedVia }) => {
	// for redirect verification page
	const Navigate = useNavigate();

	// for loading until otp was sended
	const [isLoading, setIsLoading] = useState(false);

	// for displaying value with radio button start
	const displayingEmail = () => {
		let a = foundAcc.email.split("@");
		let b = a[0];
		let newStr = "";
		for (let i in b) {
			if (i > 1 && i < b.length - 1) newStr += "*";
			else newStr += b[i];
		}

		return newStr + "@" + a[1];
	};

	const displayingPhone = () => {
		return foundAcc.phone.replace(/^(\+?\d{3})(\d+)(\d{2})$/, function () {
			return arguments[1] + arguments[2].replace(/./g, "*") + arguments[3];
		});
	};
	// for displaying value with radio button end

	// for sending opt in selected email start
	const sendOtpHandler = async () => {
		setIsLoading(true);
		if (!selectedVia) {
			toast("Must be select one!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
			setIsLoading(false);
		} else {
			try {
				const response = await fetch(
					`/user/log-in/verification/${selectedVia}`
				);

				const result = await response.json();

				if (response.status === 200) {
					setIsLoading(false);
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					});

					setTimeout(() => {
						return Navigate("../verification");
					}, 3000);
				} else if (result.error) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 2500
					});
					setIsLoading(false);
					setTimeout(() => {
						return Navigate("../find-account");
					}, 3000);
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setIsLoading(false);
				setTimeout(() => {
					return Navigate("../find-account");
				}, 3000);
			}
		}
	};
	// for sending opt in selected email end

	return (
		<>
			<div className="row m-0 selection-via-container">
				<div className="wrapper">
					<h4>Reset your password</h4>
					<p id="message">
						How do you want to receive the code to reset your password?
					</p>

					<div className="selection">
						<div className="left">
							{foundAcc.email && (
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="verification"
										id="email"
										value={foundAcc.email}
										onChange={(e) => setSelectedVia(e.target.value)}
									/>
									<label className="form-check-label" htmlFor="email">
										<p>
											Send code via email <br />
											<span>{displayingEmail()}</span>
										</p>
									</label>
								</div>
							)}

							{foundAcc.phone && (
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="verification"
										id="phone"
										value={foundAcc.phone}
										readOnly
										onChange={(e) => setSelectedVia(e.target.value)}
									/>
									<label className="form-check-label" htmlFor="phone">
										<p>
											Send code via sms <br />
											<span>{displayingPhone()}</span>
										</p>
									</label>
								</div>
							)}
						</div>
						<div className="right">
							<div className="profile">
								<img
									src={`/uploads/profile-img/${foundAcc.profile_img}`}
									alt="profile-img"
								/>

								<div className="info">
									<h6>{foundAcc.name}</h6>
									<p>ESOLUMATE User</p>
								</div>
							</div>

							<button
								type="button"
								className="btn btn-primary "
								onClick={sendOtpHandler}
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

export default Selection;
