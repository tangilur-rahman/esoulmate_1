// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./YearDropdown.css";

const YearDropdown = ({ getYear, setYear }) => {
	const [yearDropdown, setYearDropdown] = useState("");

	let yearArray = [];

	for (let index = new Date(Date.now()).getFullYear(); index >= 1971; index--) {
		yearArray.push(index);
	}

	// for close dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setYearDropdown(false);
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
				className={yearDropdown ? "year-container active" : "year-container"}
				onClick={() => setYearDropdown(!yearDropdown)}
				ref={myRef}
			>
				<input type="text" placeholder="Year" readOnly value={getYear} />

				<div className="option" ref={myRef}>
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
