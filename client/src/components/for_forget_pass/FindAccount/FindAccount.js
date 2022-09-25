// external components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import "./FindAccount.css";

const FindAccount = ({ setFoundAcc }) => {
	// for navigate reset password page
	const Navigate = useNavigate();

	// for getting email or password
	const [email_phone, setEmail_phone] = useState("");

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState("");

	// for searching-account from server start
	const searchingAccount = async () => {
		setIsLoading(true);
		if (!email_phone) {
			toast("Field is empty!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
			setIsLoading(false);
		} else {
			try {
				const response = await fetch(`/user/log-in/searching/${email_phone}`);

				const result = await response.json();

				if (response.status === 200) {
					setFoundAcc(result);
					setEmail_phone("");
					setIsLoading(false);
					setTimeout(() => {
						return Navigate("../selection");
					}, 300);
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
	};
	// for searching-account from server end

	// when press enter key submit start
	const onKeyDown = (event) => {
		if (event.key === "Enter") {
			searchingAccount();
		} else {
			return;
		}
	};
	// when press enter key submit end

	return (
		<>
			<div className="row m-0 find-account-container">
				<div className=" wrapper">
					<h4>Find you account</h4>
					<p>
						Please enter your email address or mobile number to search for your
						account.
					</p>

					<input
						type="text"
						placeholder="Email or Phone No."
						onChange={(e) => setEmail_phone(e.target.value)}
						value={email_phone}
						onKeyDown={onKeyDown}
					/>

					<div className="btn-container">
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
							onClick={searchingAccount}
						>
							{!isLoading ? (
								<span
									className="hover-link"
									style={{ display: "inline-block" }}
								>
									Continue
								</span>
							) : (
								<i className="fa-solid fa-fan fa-spin"></i>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default FindAccount;
