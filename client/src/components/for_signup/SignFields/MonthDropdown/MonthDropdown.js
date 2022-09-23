// external components
import { useState } from "react";

// internal components
import "./MonthDropdown.css";

const MonthDropdown = ({ getMonth, setMonth }) => {
	const [monthDropdown, setMonthDropdown] = useState("");

	let monthArray = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec"
	];

	return (
		<>
			<div
				className={monthDropdown ? "month-container active" : "month-container"}
				onClick={() => setMonthDropdown(!monthDropdown)}
			>
				<input
					type="text"
					placeholder="Month"
					readOnly
					value={getMonth}
					required
				/>
				<div className="option">
					{monthArray.map((value, index) => {
						return (
							<div onClick={() => setMonth(value)} key={index}>
								<span>{value}</span>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default MonthDropdown;
