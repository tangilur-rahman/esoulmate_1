import "./Header.css";

const Header = ({ profile, name, time, privacy }) => {
	return (
		<>
			{/* header-section start  */}
			<div className="header-section">
				<div className="left">
					<img
						src={profile}
						alt="profile-img"
						className="profile-photo img-fluid"
					/>

					<div className="user-info">
						<h6>{name}</h6>

						<div className="extra-info">
							<span>{time}</span>
							<span>.</span>
							<span>
								{(privacy === "public" && <i className="bi bi-globe"></i>) ||
									(privacy === "friends" && (
										<i className="bi bi-people-fill"></i>
									)) ||
									(privacy === "me" && <i className="bi bi-lock-fill"></i>)}
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
