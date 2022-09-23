import "./FollowingTab.css";

import friend from "./../../../../dummy-data/friends.json";

const FollowingTab = () => {
	return (
		<>
			<div className="following-tab-container">
				<header>
					<div className="left">
						<h5>Following</h5>
						<p>3.4k</p>
					</div>
					<div className="right">
						<i className="bi bi-search-heart"></i>
						<input
							type="search"
							name="search"
							id="search"
							autoComplete="off"
							placeholder="search following..."
						/>
					</div>
				</header>
				<div className="following row row-cols-auto">
					{friend &&
						friend.map((value, index) => {
							return (
								<div key={index}>
									<img
										src={value.friend}
										alt="following-img"
										className="img-fluid"
									/>
									<p>{value.name}</p>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default FollowingTab;
