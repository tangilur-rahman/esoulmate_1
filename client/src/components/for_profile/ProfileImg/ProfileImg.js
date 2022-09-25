// external components

// internal components
import { GetContextApi } from "./../../../ContextApi";
import friend from "./../../../dummy-data/friends.json";
import "./ProfileImg.css";

const ProfileImg = ({ getProfile }) => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	return (
		<>
			{/* profile-img-container start  */}
			<div className="cover-img">
				<img
					src={`/uploads/profile-img/${getProfile.cover_img}`}
					alt="cover-img"
				/>

				{currentUser._id === getProfile._id && (
					<div className="change-cover">
						<i className="bi bi-camera-fill"></i> <h6>Edit cover photo</h6>
					</div>
				)}
			</div>

			<div className="profile-img">
				{/* <div className="profile-wrapper"> */}
				<div id="profile-img">
					<div className="img-wrapper">
						<img
							src={`/uploads/profile-img/${getProfile.profile_img}`}
							alt="profile-img"
							className="img-fluid"
						/>
						{currentUser._id === getProfile._id && (
							<span>
								<i className="bi bi-camera-fill"></i>
							</span>
						)}
					</div>
				</div>

				{/* </div> */}

				<div className="profile-info">
					<div className="user-info">
						<h2>{getProfile.name}</h2>
						<span>3.2k following </span>

						<div className="friends">
							{friend &&
								friend.map((value, index) => {
									return (
										<div key={index}>
											<img
												src={value.friend}
												alt="follower-img"
												className={
													index === 0 ? "img-fluid firstEle" : "img-fluid"
												}
											/>
										</div>
									);
								})}
						</div>
					</div>

					{currentUser._id !== getProfile._id && (
						<div className="profile-btn" id="for-others">
							<button>
								<i className="bi bi-chat-heart"></i>Message
							</button>

							<button style={{ color: "#023e8a", fontWeight: "700" }}>
								<i className="bi bi-plus-circle"></i>Follow
								{/* <i class="bi bi-dash-circle"></i>Unfollow */}
							</button>
						</div>
					)}
				</div>
			</div>
			{/* profile-img-container end  */}
		</>
	);
};

export default ProfileImg;
