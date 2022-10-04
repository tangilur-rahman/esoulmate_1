// external components
import { useState } from "react";

// internal components
import "./DayDropdown.css";

const DayDropdown = ({ getDay, setDay }) => {
	const [dayDropdown, setDayDropdown] = useState("");

	let dayArray = [];

	for (let index = 1; index <= 31; index++) {
		dayArray.push(index);
	}

	return (
		<>
			<div
				className={dayDropdown ? "day-container active" : "day-container"}
				onClick={() => setDayDropdown(!dayDropdown)}
			>
				<input type="text" placeholder="Day" readOnly value={getDay} required />
				<div className="option">
					{dayArray.map((value, index) => {
						return (
							<div onClick={() => setDay(value)} key={index}>
								<span>{value}</span>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default DayDropdown;
