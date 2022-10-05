// external components
import { useState } from "react";

// internal components
import DayDropdown from "./DayDropdown/DayDropdown";
import GenderDropdown from "./GenderDropdown/GenderDropdown";
import MonthDropdown from "./MonthDropdown/MonthDropdown";
import YearDropdown from "./YearDropdown/YearDropdown";

import "./SignFieldsPeople.css";

const SignFieldsPeople = ({
	onChangeHandler,
	f_name,
	l_name,
	email_phone,
	password,
	c_password,
	getDay,
	setDay,
	getMonth,
	setMonth,
	getYear,
	setYear,
	getGender,
	setGender
}) => {
	// for toggle password type
	const [typeP_T, setTypeP_T] = useState(false);
	const [typeCP_T, setTypeCP_T] = useState(false);

	return (
		<>
			<div className="sign-fields">
				<table>
					<tr className="name-row-con">
						<td className="name-row">
							<input
								type="text"
								placeholder="First Name"
								required
								name="f_name"
								value={f_name}
								onChange={onChangeHandler}
							/>
						</td>
						<td className="name-row">
							<input
								type="text"
								placeholder="Last Name"
								required
								name="l_name"
								value={l_name}
								onChange={onChangeHandler}
							/>
						</td>
					</tr>

					<tr className="required-row">
						<input
							type="text"
							required
							placeholder="Email or Phone No"
							name="email_phone"
							value={email_phone}
							onChange={onChangeHandler}
						/>
					</tr>

					<tr className="required-row">
						<input
							type={typeP_T ? "text" : "password"}
							required
							placeholder="New Password"
							name="password"
							value={password}
							onChange={onChangeHandler}
						/>
						{/* for type toggle start  */}
						{password && (
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
							value={c_password}
							onChange={onChangeHandler}
						/>
						{/* for type toggle start  */}
						{c_password && (
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

					<span id="birth-text">Date of Birth</span>

					<tr className="birth-date-con">
						<td>
							<DayDropdown getDay={getDay} setDay={setDay} />
						</td>
						<td>
							<MonthDropdown getMonth={getMonth} setMonth={setMonth} />
						</td>
						<td>
							<YearDropdown getYear={getYear} setYear={setYear} />
						</td>
					</tr>

					<tr>
						<GenderDropdown getGender={getGender} setGender={setGender} />
					</tr>
				</table>
			</div>
		</>
	);
};

export default SignFieldsPeople;
