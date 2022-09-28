// external components
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { GetContextApi } from "../../../../../ContextApi";

// internal components
import "./CreatePost.css";

const CreatePost = ({
	currentUser,
	setChangeImgT,
	getPreview,
	getCoverImg,
	setCoverImg,
	getProfileImg,
	setProfileImg
}) => {
	// for updating posts when submitted
	const { setUpdatePost } = GetContextApi();

	// for getting privacy selection
	const [privacy, setPrivacy] = useState("public");
	const [priDrop, setPriDrop] = useState("");

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

	// for getting  post's text
	const [postText, setPostText] = useState("");

	// cover or profile pic submit handler start
	const submitHandler = async (e) => {
		e.preventDefault();
		if (getCoverImg || getProfileImg) {
			const formData = new FormData();
			formData.append("file", getCoverImg ? getCoverImg : getProfileImg);

			formData.append("text", postText);
			formData.append("privacy", privacy);

			try {
				const coverUrl = `/post/profile?folder=profile-img&type=cover`;

				const profileUrl = `/post/profile?folder=profile-img&type=profile`;

				const response = await fetch(getCoverImg ? coverUrl : profileUrl, {
					method: "POST",
					body: formData
				});

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 1500
					});

					setChangeImgT(false);
					setCoverImg("");
					setProfileImg("");

					setUpdatePost(Date.now());
				} else if (result.error) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 3000
					});
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setTimeout(() => {
					setChangeImgT(false);
					setCoverImg("");
					setProfileImg("");
				}, 3000);
			}
		} else {
			toast("Nothing have to changed!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
		}
	};
	// cover or profile pic submit handler end

	return (
		<>
			{/* create-post section start  */}
			<div className="chn-profile-container">
				<div className="user-info">
					<img
						src={`/uploads/profile-img/${currentUser.profile_img}`}
						alt="profile-img"
						className="img-fluid"
					/>

					<div className="user-name">
						<h6>{currentUser.name}</h6>

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
					<TextareaAutosize
						name="for-text"
						id="create-post"
						placeholder={
							getCoverImg
								? "Write something about your cover photo..."
								: "Write something about your profile picture..."
						}
						onChange={(e) => setPostText(e.target.value)}
						value={postText}
					/>
				</div>

				<div className="preview-container">
					<img
						src={getPreview}
						alt="preview-img"
						className="img-fluid"
						id={getCoverImg ? "when-cover" : "when-profile"}
					/>
				</div>

				<div className="share-btn-container">
					<button
						type="button"
						className="btn btn-light"
						onClick={() => {
							setChangeImgT(false);
							setCoverImg("");
							setProfileImg("");
						}}
					>
						<span className="hover-link">Cancel</span>
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={submitHandler}
					>
						<span className="hover-link">Share</span>
					</button>
				</div>
			</div>
			{/* create-post section end  */}
		</>
	);
};

export default CreatePost;
