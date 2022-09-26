// external components
import { useState } from "react";

// internal components
import { GetContextApi } from "./../../../ContextApi";
import friend from "./../../../dummy-data/friends.json";
import CngProfileImg from "./CngProfileImg/CngProfileImg";
import "./ProfileImg.css";

const ProfileImg = ({ getProfile }) => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// for cover & profile change handler toggle
	const [changeImgT, setChangeImgT] = useState("");

	// for file handle
	const [getCoverImg, setCoverImg] = useState("");
	const [getProfileImg, setProfileImg] = useState("");

	// for preview image
	const [getPreview, setPreview] = useState("");

	// for preview image start
	const imgHandlerCover = (event) => {
		setCoverImg(event.target.files[0]);
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setPreview(reader.result);
				setChangeImgT(true);
			}
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	const imgHandlerProfile = (event) => {
		setProfileImg(event.target.files[0]);
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setPreview(reader.result);
				setChangeImgT(true);
			}
		};
		reader.readAsDataURL(event.target.files[0]);
	};
	// for preview image end

	return (
		<>
			{/* profile-img-container start  */}
			<div className="cover-img">
				<img
					src={`/uploads/profile-img/${getProfile.cover_img}`}
					alt="cover-img"
				/>

				{currentUser._id === getProfile._id && (
					<label htmlFor="for-cover">
						<div className="change-cover">
							<i className="bi bi-camera-fill"></i> <h6>Edit cover photo</h6>
						</div>
					</label>
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
							<label htmlFor="for-profile">
								<span>
									<i className="bi bi-camera-fill"></i>
								</span>
							</label>
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
			{/* for input declaration start  */}
			<input
				type="file"
				name="for-cover"
				accept="image/*"
				id="for-cover"
				style={{ display: "none" }}
				onChange={imgHandlerCover}
			/>

			<input
				type="file"
				name="for-profile"
				accept="image/*"
				id="for-profile"
				style={{ display: "none" }}
				onChange={imgHandlerProfile}
			/>
			{/* for input declaration end */}

			{(getCoverImg || getProfileImg) && changeImgT && (
				<CngProfileImg
					getCoverImg={getCoverImg}
					setCoverImg={setCoverImg}
					getProfileImg={getProfileImg}
					setProfileImg={setProfileImg}
					getPreview={getPreview}
					setChangeImgT={setChangeImgT}
				/>
			)}
			{/* profile-img-container end  */}
		</>
	);
};

export default ProfileImg;
