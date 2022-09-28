// external components
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

// internal components
import { GetContextApi } from "../../../../../../ContextApi";
import "./CreatePost.css";

const CreatePost = () => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// for privacy selection
	const [privacy, setPrivacy] = useState("public");
	const [priDrop, setPriDrop] = useState("");

	// for post category selection
	const [category, setCategory] = useState("knowledge");
	const [dropdown, setDropdown] = useState("");

	// for post-text
	const [postText, setPostText] = useState("");

	// privacy display handler start
	const displayingPrivacy = () => {
		if (privacy === "public") {
			return "🌍  Public";
		} else if (privacy === "friends") {
			return "👨‍👧‍👦  Friends";
		} else if (privacy === "only me") {
			return "🔒  Only Me";
		}
	};
	// privacy display handler end

	// category display handler start
	const displayingCategory = () => {
		if (category === "knowledge") {
			return "🔰   Knowledge";
		} else if (category === "skill") {
			return "⛷️   Skill";
		} else if (category === "q&a") {
			return "❓   Q & A";
		}
	};
	// category display handler end

	return (
		<>
			{/* create-post section start  */}
			<div className="create-post-container">
				<div className="user-info">
					<img
						src={`/uploads/profile-img/${currentUser.profile_img}`}
						alt="profile-img"
						className="img-fluid"
					/>

					<div className="user-name">
						<h6 className="hover-link">{currentUser.name}</h6>

						<div
							className={
								priDrop ? "privacy-container active" : "privacy-container"
							}
							onClick={() => setPriDrop(!priDrop)}
						>
							<input value={displayingPrivacy()} readOnly />

							<div className="option">
								<div onClick={() => setPrivacy("public")}>
									🌍&nbsp; &nbsp;Public
								</div>
								<div onClick={() => setPrivacy("friends")}>
									👨‍👧‍👦&nbsp; &nbsp;Friends
								</div>
								<div onClick={() => setPrivacy("only me")}>
									🔒&nbsp; &nbsp;Only Me
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="input-container">
					<form
						encType="multipart/form-data"
						onSubmit={(event) => event.preventDefault()}
					>
						<TextareaAutosize
							name="for-text"
							id="create-post"
							placeholder="Write something about that..."
							onChange={(e) => setPostText(e.target.value)}
							value={postText}
						/>

						<input
							type="file"
							name="for-image"
							accept="image/*"
							id="for-image"
							style={{ display: "none" }}
						/>
						<input
							type="file"
							name="for-video"
							accept="video/mp4,video/x-m4v,video/*"
							id="for-video"
							style={{ display: "none" }}
						/>

						<input
							type="file"
							accept="audio/mp3,audio/*;capture=microphone"
							name="for-audio"
							id="for-audio"
							style={{ display: "none" }}
						/>

						<input
							type="file"
							name="for-pdf"
							id="for-pdf"
							accept="application/pdf,application/vnd.ms-excel"
							style={{ display: "none" }}
						/>
					</form>
				</div>

				<div className="attachment-container">
					<label
						htmlFor="for-image"
						title="attach image"
						className="title-tip title-tip-up"
					>
						<i className="bi bi-image"></i>
					</label>

					<label
						htmlFor="for-video"
						title="attach video"
						className="title-tip title-tip-up"
					>
						<i className="bi bi-play-circle"></i>
					</label>

					<label
						htmlFor="for-audio"
						title="attach audio"
						className="title-tip title-tip-up"
					>
						<i className="bi bi-mic"></i>
					</label>

					<label
						htmlFor="for-pdf"
						title="attach file"
						className="title-tip title-tip-up"
					>
						<i className="bi bi-file-earmark-medical"></i>
					</label>

					<label
						htmlFor="for-poll"
						title="create poll"
						className="title-tip title-tip-up"
					>
						<i className="bi bi-plus-slash-minus"></i>
					</label>
				</div>

				<div className="share-container">
					<div
						className={
							dropdown ? "selection-container active" : "selection-container"
						}
						onClick={() => setDropdown(!dropdown)}
					>
						<input value={displayingCategory()} readOnly />
						<div className="option">
							<div onClick={() => setCategory("knowledge")}>
								🔰&nbsp;&nbsp;Knowledge
							</div>
							<div onClick={() => setCategory("skill")}>
								⛷️&nbsp;&nbsp;Skill
							</div>
							<div onClick={() => setCategory("q&a")}>❓&nbsp;&nbsp;Q & A</div>
						</div>
					</div>
					<div className={postText ? "share-btn active" : "share-btn"}>
						<h4 className={postText ? "hover-link" : ""}>Share</h4>
					</div>
				</div>
			</div>
			{/* create-post section end  */}
		</>
	);
};

export default CreatePost;
