import friends from "./../../../../../dummy-data/friends";

import { Link } from "react-router-dom";

import "./Following.css";

const Following = () => {
	return (
		<>
			<div className="following-container">
				<div className="header">
					<div className="title">
						<h5>Following</h5>
						<p>3456 following</p>
					</div>
					<Link to="#" className="link">
						See all following
					</Link>
				</div>

				<div className="follower row row-cols-3">
					{friends &&
						friends.map((value, index) => {
							return (
								<div key={index}>
									<img src={value.friend} alt="follower-img" className="img-fluid" />
                           <p>{value.name}</p>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default Following;
