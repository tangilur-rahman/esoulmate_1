import "./PhotosTab.css";
import { useState } from "react";

import friend from "./../../../../dummy-data/friends.json";

const PhotosTab = () => {
	const [photoToggle, setPhotoToggle] = useState(1);
	const [dropdown, setDropdown] = useState("");

	return (
		<>
			<div className="photos-tab-container">
				<header>
					<h5>Photos</h5>
					<div className="right">
						<span
							onClick={() => setPhotoToggle(1)}
							className={photoToggle === 1 ? "active" : ""}
						>
							your photos
						</span>

						<span
							onClick={() => setPhotoToggle(2)}
							className={photoToggle === 2 ? "active" : ""}
						>
							profile photos
						</span>

						<span
							onClick={() => setPhotoToggle(3)}
							className={photoToggle === 3 ? "active" : ""}
						>
							cover Photos
						</span>

						<span className="icon">
							<i
								className="bi bi-three-dots"
								onClick={() => setDropdown(!dropdown)}
							></i>
							<ul className={dropdown ? "action" : ""}>
								<li
									onClick={() => {
										setPhotoToggle(2);
										setDropdown(!dropdown);
									}}
								>
									profile photos
								</li>
								<li
									onClick={() => {
										setPhotoToggle(3);
										setDropdown(!dropdown);
									}}
								>
									cover photos
								</li>
							</ul>
						</span>
					</div>
				</header>

				<div className="photos row row-cols-auto">
					{friend &&
						friend.map((value, index) => {
							return (
								<div key={index}>
									<img src={value.friend} alt="photos" className="img-fluid" />
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default PhotosTab;
