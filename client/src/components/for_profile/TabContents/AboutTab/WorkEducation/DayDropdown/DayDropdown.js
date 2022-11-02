// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./DayDropdown.css";

const DayDropdown = ({ getDay, setDay, selectOption }) => {
	const [dayDropdown, setDayDropdown] = useState("");

	let dayArray = [];

	for (let index = 1; index <= 31; index++) {
		dayArray.push(index);
	}

	// for close dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setDayDropdown(false);
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
				className={dayDropdown ? "day-container active" : "day-container"}
				onClick={() => setDayDropdown(!dayDropdown)}
				ref={myRef}
				id={selectOption ? "from-option" : ""}
			>
				<input
					type="text"
					placeholder="Day"
					readOnly
					value={getDay}
					id={selectOption ? "from-option" : ""}
				/>

				{!selectOption && (
					<div className="option" ref={myRef}>
						{dayArray.map((value, index) => {
							return (
								<div onClick={() => setDay(value)} key={index}>
									<span>{value}</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default DayDropdown;
