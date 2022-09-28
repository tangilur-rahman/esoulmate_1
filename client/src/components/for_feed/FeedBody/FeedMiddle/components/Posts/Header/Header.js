// external components
import TimeAgo from "timeago-react";

// internal components
import "./Header.css";

const Header = ({ profile, name, header, time, privacy }) => {
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
						<div className="top-line">
							<h6>{name}</h6> <p>{header}</p>
						</div>

						<div className="extra-info">
							<span>
								<TimeAgo datetime={time} />
							</span>
							<span>.</span>
							<span id="privacy">
								{(privacy === "public" && <i className="bi bi-globe"></i>) ||
									(privacy === "friends" && (
										<i className="bi bi-people-fill"></i>
									)) ||
									(privacy === "only me" && (
										<i className="bi bi-lock-fill"></i>
									))}
							</span>
						</div>
					</div>
				</div>

				<div className="right">
					<i className="bi bi-three-dots"></i>
				</div>
			</div>
			{/* header-section end  */}
		</>
	);
};

export default Header;
