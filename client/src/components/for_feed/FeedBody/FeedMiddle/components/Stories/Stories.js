import "./Stories.css";

//own components
import { GetContextApi } from "../../../../../../ContextApi";
import stories_data from "./../../../../../../dummy-data/profile-images.json";

const Stories = () => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	return (
		<>
			{/* stories section start */}
			<div className="stories">
				{/* current-user add story  */}
				<form encType="multipart/form-data">
					<input
						type="file"
						name="your-story"
						accept="image/*"
						id="your-story"
						style={{ display: "none" }}
					/>
					<label htmlFor="your-story">
						<div className="story" id="your-story">
							<img
								src={`/uploads/profile-img/${currentUser.profile_img}`}
								alt="profile-img"
								className="img-fluid"
							/>
							<i className="bi bi-plus-circle-fill"></i>
						</div>
					</label>
				</form>

				{/* another users story  */}
				{stories_data &&
					stories_data.map((value) => {
						return (
							<div className="story" key={value.id}>
								<img src={`/assets/dummy/${value.img}`} alt="profile-img" />
							</div>
						);
					})}
			</div>
			{/* stories section end */}
		</>
	);
};

export default Stories;
