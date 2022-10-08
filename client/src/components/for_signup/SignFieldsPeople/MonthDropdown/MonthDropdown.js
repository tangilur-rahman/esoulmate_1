// external components
import { useEffect, useRef, useState } from "react";

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

	// for close dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setMonthDropdown(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	// for close dropdown when outside clicked end

	return (
		<>
			<div
				className={monthDropdown ? "month-container active" : "month-container"}
				onClick={() => setMonthDropdown(!monthDropdown)}
				ref={myRef}
			>
				<input
					type="text"
					placeholder="Month"
					readOnly
					value={getMonth}
					required
				/>
				<div className="option" ref={myRef}>
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
