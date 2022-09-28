// external components
import { useState } from "react";

// internal components
import "./ProfileTabs.css";

const ProfileTabs = ({ tabToggle, setTabToggle }) => {
	const [moreToggle, setMoreToggle] = useState(false);
	return (
		<>
			<div className="profile-tab-container">
				<div
					className={tabToggle === 1 ? "tab active" : "tab"}
					onClick={() => setTabToggle(1)}
				>
					Posts
				</div>

				<div
					className={tabToggle === 2 ? "tab active" : "tab"}
					onClick={() => setTabToggle(2)}
				>
					About
				</div>
				<div
					className={tabToggle === 3 ? "tab active" : "tab"}
					onClick={() => setTabToggle(3)}
				>
					Followers
				</div>
				<div
					className={tabToggle === 4 ? "tab active" : "tab"}
					onClick={() => setTabToggle(4)}
				>
					Followings
				</div>
				<div
					className={tabToggle === 5 ? "tab active" : "tab"}
					onClick={() => setTabToggle(5)}
				>
					Knowledge
				</div>
				<div
					className={tabToggle === 6 ? "tab active" : "tab"}
					onClick={() => setTabToggle(6)}
				>
					Skills
				</div>

				<div
					className={tabToggle === 7 ? "tab active" : "tab"}
					onClick={() => setTabToggle(7)}
				>
					Questions
				</div>

				<div
					className={tabToggle === 8 ? "tab active" : "tab"}
					onClick={() => setTabToggle(8)}
				>
					Collections
				</div>

				<div
					className={tabToggle === 9 ? "tab active" : "tab"}
					onClick={() => setTabToggle(9)}
				>
					Purchased
				</div>

				{/* more tab start  */}
				<div
					className={moreToggle ? "tab action" : "tab"}
					id="more"
					onClick={() => setMoreToggle(!moreToggle)}
				>
					More
					<ul className={moreToggle ? "active" : "inactive"}>
						<li
							onClick={() => {
								setTabToggle(3);
								setMoreToggle(!moreToggle);
							}}
						>
							Followers
						</li>
						<li
							onClick={() => {
								setTabToggle(4);
								setMoreToggle(!moreToggle);
							}}
						>
							Followings
						</li>

						<li
							onClick={() => {
								setTabToggle(5);
								setMoreToggle(!moreToggle);
							}}
						>
							Knowledge
						</li>

						<li
							onClick={() => {
								setTabToggle(6);
								setMoreToggle(!moreToggle);
							}}
						>
							Skills
						</li>

						<li
							onClick={() => {
								setTabToggle(7);
								setMoreToggle(!moreToggle);
							}}
						>
							Questions
						</li>

						<li
							onClick={() => {
								setTabToggle(8);
								setMoreToggle(!moreToggle);
							}}
						>
							Collections
						</li>

						<li
							onClick={() => {
								setTabToggle(9);
								setMoreToggle(!moreToggle);
							}}
						>
							Purchased
						</li>
					</ul>
				</div>
				{/* more tab end  */}
			</div>
		</>
	);
};

export default ProfileTabs;
