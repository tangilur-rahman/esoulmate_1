// external components
import TimeAgo from "timeago-react";

// internal components
import "./Header.css";

const Header = ({ profile, name, category, time, privacy }) => {
	return (
		<>
			{/* header-section start  */}
			<div className="header-section">
				<div className="left">
					<img
						src={`/uploads/profile-img/${profile}`}
						alt="profile-img"
						className="img-fluid"
					/>

					<div className="user-info">
						<h6>{name}</h6>

						<div className="extra-info">
							<span>
								<TimeAgo datetime={time} />
							</span>
							<span>.</span>
							<span id="privacy">
								{(privacy === "Public" && <i className="bi bi-globe"></i>) ||
									(privacy === "Followers" && (
										<i className="bi bi-people-fill"></i>
									)) ||
									(privacy === "Only Me" && (
										<i className="bi bi-lock-fill"></i>
									))}
							</span>
						</div>
					</div>
				</div>

				<div className="right">
					{category && <p>{category}</p>}

					<i className="bi bi-three-dots"></i>
				</div>
			</div>
			{/* header-section end  */}
		</>
	);
};

export default Header;
