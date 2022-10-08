// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./GenderDropdown.css";

const GenderDropdown = ({ getGender, setGender }) => {
	const [genderDrop, setGenderDrop] = useState("");

	const displayGender = () => {
		if (getGender === "male") {
			return "👱‍♂️  Male";
		} else if (getGender === "female") {
			return "👩  Female";
		} else if (getGender === "other") {
			return "⚨  Other";
		} else {
			return "";
		}
	};

	// for close dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setGenderDrop(false);
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
				className={genderDrop ? "gender-container active" : "gender-container"}
				onClick={() => setGenderDrop(!genderDrop)}
				ref={myRef}
			>
				<input
					type="text"
					placeholder="Gender"
					readOnly
					value={displayGender()}
					required
				/>
				<div className="option" ref={myRef}>
					<div onClick={() => setGender("male")}>
						<span>👱‍♂️ &nbsp; Male</span>
					</div>
					<div onClick={() => setGender("female")}>
						<span>👩 &nbsp; Female</span>
					</div>

					<div onClick={() => setGender("other")}>
						<span>&nbsp; ⚨ &nbsp; Other</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default GenderDropdown;
