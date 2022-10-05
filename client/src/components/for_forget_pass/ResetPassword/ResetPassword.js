// external components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import "./ResetPassword.css";

const ResetPassword = ({ isMatch }) => {
	// for redirect log-in page
	const Navigate = useNavigate();

	// for toggle password type
	const [typeP_T, setTypeP_T] = useState(false);
	const [typeCP_T, setTypeCP_T] = useState(false);

	// for loading until not submitted
	const [isLoading, setIsLoading] = useState("");

	// for new password field
	const [getNew, setNew] = useState("");

	// for new password field
	const [getConform, setConform] = useState("");

	// submit handler start
	const submitHandler = async () => {
		setIsLoading(true);

		if (!(getNew && getConform)) {
			toast("Fill-up all fields!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});

			setIsLoading(false);
		} else {
			if (getNew.length < 8) {
				toast("password is at least 8 characters", {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
				setIsLoading(false);
			} else {
				try {
					if (!(getNew === getConform)) {
						toast("Password not matching!", {
							position: "top-right",
							theme: "dark",
							autoClose: 3000
						});
						setIsLoading(false);
					} else {
						const response = await fetch(
							`/user/log-in/reset-password/${isMatch.email_phone}/${getNew}`
						);

						const result = await response.json();

						if (response.status === 200) {
							toast.success(result.message, {
								position: "top-right",
								theme: "colored",
								autoClose: 2500
							});

							setIsLoading(false);
							setNew("");
							setConform("");

							setTimeout(() => {
								return Navigate("/");
							}, 3000);
						} else if (response.status === 400) {
							toast(result.error, {
								position: "top-right",
								theme: "dark",
								autoClose: 3000
							});
							setIsLoading(false);
						} else if (result.error) {
							toast.error(result.error, {
								position: "top-right",
								theme: "colored",
								autoClose: 3000
							});
							setIsLoading(false);
						}
					}
				} catch (error) {
					toast.error(error.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 2500
					});
					setIsLoading(false);
					setTimeout(() => {
						return Navigate("/login");
					}, 3000);
				}
			}
		}
	};
	// submit handler end

	// when press enter key submit start
	const onKeyDown = (event) => {
		if (event.key === "Enter") {
			submitHandler();
		} else {
			return;
		}
	};
	// when press enter key submit end

	return (
		<>
			<div className="row m-0 reset-password-container">
				<div className=" wrapper">
					<h4>Choose a new password</h4>
					<p>
						Create a new password that is at least 8 characters long. A strong
						password has a combination of letters, digits and punctuation marks.
					</p>

					<div className="input-fields">
						<span>
							<input
								type={typeP_T ? "text" : "password"}
								placeholder="New Password"
								onChange={(e) => setNew(e.target.value)}
								value={getNew}
							/>

							{/* for type toggle start  */}
							{getNew && (
								<span className="eye">
									{typeP_T ? (
										<i
											className="fa-solid fa-eye"
											onClick={() => setTypeP_T(!typeP_T)}
											style={{ color: "#6930c3" }}
										></i>
									) : (
										<i
											className="fa-solid fa-eye-slash"
											onClick={() => setTypeP_T(!typeP_T)}
										></i>
									)}
								</span>
							)}
							{/* for type toggle end  */}
						</span>

						<span>
							<input
								type={typeCP_T ? "text" : "password"}
								placeholder="Confirm Password"
								onChange={(e) => setConform(e.target.value)}
								value={getConform}
								onKeyDown={onKeyDown}
							/>

							{/* for type toggle start  */}
							{getConform && (
								<span className="eye">
									{typeCP_T ? (
										<i
											className="fa-solid fa-eye"
											onClick={() => setTypeCP_T(!typeCP_T)}
											style={{ color: "#6930c3" }}
										></i>
									) : (
										<i
											className="fa-solid fa-eye-slash"
											onClick={() => setTypeCP_T(!typeCP_T)}
										></i>
									)}
								</span>
							)}
							{/* for type toggle end  */}
						</span>
					</div>

					<div className="reset-btn-container">
						<button type="button" className="btn btn-light">
							<span
								className="hover-link"
								id="cancel"
								style={{ display: "inline-block" }}
								onClick={() => Navigate("/log-in")}
							>
								Cancel
							</span>
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={submitHandler}
						>
							{!isLoading ? (
								<span
									className="hover-link"
									style={{ display: "inline-block" }}
								>
									Submit
								</span>
							) : (
								<i className="fa-solid fa-spinner fa-spin"></i>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
