// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./PrivacyDropdown.css";

const PrivacyDropdown = ({ getPrivacy, setPrivacy }) => {
	const [privacyDrop, setPrivacyDrop] = useState("");

	const displayPrivacy = () => {
		if (getPrivacy === "Public") {
			return "🌍 Public";
		} else if (getPrivacy === "Friends") {
			return "👨‍👧‍👦 Friends";
		} else if (getPrivacy === "Only Me") {
			return "🔒 Only Me";
		} else {
			return "";
		}
	};

	// for close dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setPrivacyDrop(false);
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
				className={
					privacyDrop ? "privacy-container active" : "privacy-container"
				}
				onClick={() => setPrivacyDrop(!privacyDrop)}
				ref={myRef}
			>
				<input
					type="text"
					placeholder="privacy"
					readOnly
					value={displayPrivacy()}
					required
				/>

				<div className="option" ref={myRef}>
					<div onClick={() => setPrivacy("Public")}>
						<span>🌍 &nbsp;Public</span>
					</div>
					<div onClick={() => setPrivacy("Friends")}>
						<span>👨‍👧‍👦 &nbsp;Friends</span>
					</div>

					<div onClick={() => setPrivacy("Only Me")}>
						<span>🔒 &nbsp;Only Me</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default PrivacyDropdown;
