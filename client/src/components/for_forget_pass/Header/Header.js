// external components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import "./Header.css";

const Header = () => {
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
						autoClose: 2500
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

	return (
		<>
			<div className="row m-0 forget-header-container">
				<div className="col-lg-3 col-1 header-left p-0">
					<img src="/assets/logo/esoulmate-logo.png" alt="logo" />
					<h2>Esoulmate</h2>
				</div>

				<div className="col-7 p-0 header-right">
					<div className="input-fields">
						<div className="required-field">
							<input
								type="text"
								placeholder="Email or Phone No."
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
					<button
						type="button"
						className="btn btn-primary"
						onClick={submitHandler}
					>
						<span className="hover-link">Log In</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default Header;
