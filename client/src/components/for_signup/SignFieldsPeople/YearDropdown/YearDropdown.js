// external components
import { useState } from "react";

// internal components
import "./YearDropdown.css";

const YearDropdown = ({ getYear, setYear }) => {
	const [yearDropdown, setYearDropdown] = useState("");

	let yearArray = [];

	for (let index = new Date(Date.now()).getFullYear(); index >= 1971; index--) {
		yearArray.push(index);
	}

	return (
		<>
			<div
				className={yearDropdown ? "year-container active" : "year-container"}
				onClick={() => setYearDropdown(!yearDropdown)}
			>
				<input
					type="text"
					placeholder="Year"
					readOnly
					value={getYear}
					required
				/>
				<div className="option">
					{yearArray.map((value, index) => {
						return (
							<div onClick={() => setYear(value)} key={index}>
								<span>{value}</span>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default YearDropdown;
