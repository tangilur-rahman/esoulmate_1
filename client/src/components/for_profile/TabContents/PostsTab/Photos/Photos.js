import { Link } from "react-router-dom";

import friends from "./../../../../../dummy-data/friends";

import "./Photos.css";

const Photos = () => {
	return (
		<>
			<div className="photos-container">
				<div className="header">
					<h5>Photos</h5>
					<Link to={"#"} className="link">
						See all photos
					</Link>
				</div>

				<div className="photo row row-cols-3">
					{friends &&
						friends.map((value, index) => {
							return (
								<img
									src={value.friend}
									alt="friend-img"
									key={index}
									className="img-fluid"
								/>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default Photos;
