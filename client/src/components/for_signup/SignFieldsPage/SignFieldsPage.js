// external components
import { useState } from "react";

// internal components
import PageType from "./PageType/PageType";
import "./SignFieldsPage.css";

const SignFieldsPage = ({
	getPName,
	setPName,
	email_phoneP,
	setEmail_phoneP,
	passwordP,
	setPasswordP,
	c_passwordP,
	setC_PasswordP,
	getPType,
	setPType
}) => {
	// for toggle password type
	const [typeP_T, setTypeP_T] = useState(false);
	const [typeCP_T, setTypeCP_T] = useState(false);

	return (
		<>
			<div className="sign-page-container">
				<table>
					<tr className="required-row">
						<input
							type="text"
							required
							placeholder="Page Name..."
							value={getPName}
							onChange={(e) => setPName(e.target.value)}
							autoComplete="off"
						/>
					</tr>

					<tr>
						<PageType getPType={getPType} setPType={setPType} />
					</tr>

					<tr className="required-row">
						<input
							type="text"
							required
							placeholder="Email or Phone No..."
							value={email_phoneP}
							onChange={(e) => setEmail_phoneP(e.target.value)}
						/>
					</tr>

					<tr className="required-row">
						<input
							type={typeP_T ? "text" : "password"}
							required
							placeholder="New Password"
							name="password"
							value={passwordP}
							onChange={(e) => setPasswordP(e.target.value)}
						/>
						{/* for type toggle start  */}
						{passwordP && (
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
					</tr>

					<tr className="required-row">
						<input
							type={typeCP_T ? "text" : "password"}
							required
							placeholder="Confirm Password"
							name="c_password"
							value={c_passwordP}
							onChange={(e) => setC_PasswordP(e.target.value)}
						/>
						{/* for type toggle start  */}
						{c_passwordP && (
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
					</tr>
				</table>
			</div>
		</>
	);
};

export default SignFieldsPage;
