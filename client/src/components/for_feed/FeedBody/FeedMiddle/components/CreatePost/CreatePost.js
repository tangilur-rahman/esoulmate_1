import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./CreatePost.css";

const CreatePost = () => {
	// for privacy selection
	const [privacy, setPrivacy] = useState("");
	const [priDrop, setPriDrop] = useState("");

	// for knowledge selection
	const [knowledge, setKnowledge] = useState("");
	const [dropdown, setDropdown] = useState("");

	// for post-text
	const [postText, setPostText] = useState("");

	const onChangeHandler = (event) => {
		setPostText(event.target.value);
	};

	return (
		<>
			{/* create-post section start  */}
			<div className="create-post-container">
				<div className="user-info">
					<img
						src="/assets/images/profile/tangil.png"
						alt="profile-img"
						className="profile-photo img-fluid"
					/>

					<div className="user-name">
						<h6>Tangilur Rahman</h6>

						<div
							className={
								priDrop ? "privacy-container active" : "privacy-container"
							}
							onClick={() => setPriDrop(!priDrop)}
						>
							<input
								type="text"
								placeholder="🌍  Public"
								readOnly
								value={privacy}
							/>
							<div className="option">
								<div onClick={() => setPrivacy("🌍  Public")}>
									<i className="bi bi-globe"></i>Public
								</div>
								<div onClick={() => setPrivacy("🧑🏻‍🤝‍🧑🏻  Friends")}>
									<i className="bi bi-people-fill"></i>Friends
								</div>
								<div onClick={() => setPrivacy("🔒  Only Me")}>
									<i className="bi bi-lock-fill"></i>Only Me
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
							autoFocus
							id="create-post"
							placeholder="Share your knowledge & skills or ask me ..."
							onChange={onChangeHandler}
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

						<input
							type="submit"
							value="Share"
							id="for-share"
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
						<input
							type="text"
							placeholder="🔰  Knowledge"
							readOnly
							value={knowledge}
						/>
						<div className="option">
							<div onClick={() => setKnowledge("🔰  Knowledge")}>
								<i className="bi bi-book-half"></i>
								Knowledge
							</div>
							<div onClick={() => setKnowledge("⛷️  Skill")}>
								<i className="bi bi-mortarboard"></i>
								Skills
							</div>
							<div onClick={() => setKnowledge("❓  Q & A")}>
								<i className="bi bi-patch-question"></i>Q & A
							</div>
						</div>
					</div>
					<label htmlFor="for-share" className={postText ? "" : "active"}>
						<h4>Share</h4>
					</label>
				</div>
			</div>
			{/* create-post section end  */}
		</>
	);
};

export default CreatePost;
