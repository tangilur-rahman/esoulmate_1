// external components
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../../ContextApi";
import "./CreatePost.css";

const CreatePost = () => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// for privacy selection
	const [privacy, setPrivacy] = useState("Public");
	const [priDrop, setPriDrop] = useState("");

	// when click outside privacy dropdown closed start
	const forPrivacy = useRef();

	const handleClickOutside = (e) => {
		if (!forPrivacy.current?.contains(e.target)) {
			setPriDrop(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	// when click outside privacy dropdown closed end

	// for post category selection
	const [category, setCategory] = useState("Knowledge");
	const [dropdown, setDropdown] = useState("");

	// when click outside category dropdown closed start
	const forCategory = useRef();

	const handleClickOutsideCat = (e) => {
		if (!forCategory.current?.contains(e.target)) {
			setDropdown(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideCat);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideCat);
	}, []);
	// when click outside category dropdown closed end

	// for post-text
	const [postText, setPostText] = useState("");

	// for getting file start
	const [getFile, setFile] = useState("");
	const [getPreview, setPreview] = useState("");

	useEffect(() => {
		if (getFile) {
			// for getting file extension
			const ext = getFile.name.split(".").pop();

			if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.readyState === 2) {
						setPreview(reader.result);
					}
				};
				reader.readAsDataURL(getFile);
			} else if (
				ext === "mp4" ||
				ext === "mov" ||
				ext === "wmv" ||
				ext === "avi" ||
				ext === "mkv" ||
				ext === "flv" ||
				ext === "mvk"
			) {
				setPreview("/assets/extra/mp4.png");
			} else if (ext === "mp3" || ext === "ogg" || ext === "WAV") {
				setPreview("/assets/extra/mp3.png");
			} else if (ext === "pdf") {
				setPreview("/assets/extra/pdf.png");
			} else {
				toast.error("Invalid file-type", {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getFile]);
	// for getting file end

	// for submitting attachments on server start
	const submitHandler = async (e) => {
		e.preventDefault();
		if (postText || getFile) {
			const formData = new FormData();
			formData.append("file", getFile);

			formData.append("text", postText);
			formData.append("privacy", privacy);
			formData.append("category", category);

			try {
				const response = await fetch("/post/attachment", {
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

					setPostText("");
					setPreview("public");
					setCategory("knowledge");
					setFile("");
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
					setFile("");
					setPreview("");
				}, 3000);
			}
		} else {
			toast("Nothing have to share!", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
		}
	};
	// for submitting attachments on server end

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
							ref={forPrivacy}
						>
							<input value={privacy} readOnly id="display-privacy" />

							<div className="option" ref={forPrivacy}>
								<div onClick={() => setPrivacy("Public")}>
									&nbsp; &nbsp;Public
								</div>
								<div onClick={() => setPrivacy("Followers")}>
									&nbsp; &nbsp;Followers
								</div>
								<div onClick={() => setPrivacy("Only Me")}>
									&nbsp; &nbsp;Only Me
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
							placeholder="Share your Knowledge, QnA, Skill . . ."
							onChange={(e) => setPostText(e.target.value)}
							value={postText}
						/>

						<input
							type="file"
							name="for-image"
							accept="image/*"
							id="for-image"
							style={{ display: "none" }}
							onChange={(file) => setFile(file.target.files[0])}
						/>
						<input
							type="file"
							name="for-video"
							accept="video/mp4,video/x-m4v,video/*"
							id="for-video"
							style={{ display: "none" }}
							onChange={(file) => setFile(file.target.files[0])}
						/>

						<input
							type="file"
							accept="audio/mp3,audio/*;capture=microphone"
							name="for-audio"
							id="for-audio"
							style={{ display: "none" }}
							onChange={(file) => setFile(file.target.files[0])}
						/>

						<input
							type="file"
							name="for-pdf"
							id="for-pdf"
							accept="application/pdf"
							style={{ display: "none" }}
							onChange={(file) => setFile(file.target.files[0])}
						/>
					</form>
				</div>

				{getFile && getPreview && (
					<div className="preview-container">
						<img
							src={getPreview}
							alt="preview"
							className="img-fluid"
							id={
								getFile.name.split(".").slice(-1)[0] === "png" ||
								getFile.name.split(".").slice(-1)[0] === "jpg" ||
								getFile.name.split(".").slice(-1)[0] === "jpeg"
									? "when-img"
									: "when-other"
							}
						/>

						{!(
							getFile.name.split(".").slice(-1)[0] === "png" ||
							getFile.name.split(".").slice(-1)[0] === "jpg" ||
							getFile.name.split(".").slice(-1)[0] === "jpeg"
						) && <p>{getFile.name}</p>}
					</div>
				)}

				<div className="attachment-container">
					<label htmlFor="for-image">
						<i className="bi bi-image"></i>
						<h6 className="title-popup" id="attach-image">
							attach image
						</h6>
					</label>

					<label htmlFor="for-video">
						<i className="bi bi-play-circle" id="for-video-icon"></i>
						<h6 className="title-popup" id="attach-video">
							attach video
						</h6>
					</label>

					<label htmlFor="for-audio">
						<i className="bi bi-mic"></i>
						<h6 className="title-popup" id="attach-audio">
							attach audio
						</h6>
					</label>

					<label htmlFor="for-pdf">
						<i className="fa-solid fa-paperclip"></i>
						<h6 className="title-popup" id="attach-document">
							attach document
						</h6>
					</label>

					<label htmlFor="for-poll">
						<i className="fa-solid fa-chart-simple"></i>
						<h6 className="title-popup" id="create-poll">
							create poll
						</h6>
					</label>
				</div>

				<div className="share-container">
					<div
						className={
							dropdown ? "selection-container active" : "selection-container"
						}
						onClick={() => setDropdown(!dropdown)}
						ref={forCategory}
					>
						<input value={category} readOnly />

						<div className="option" ref={forCategory}>
							<div onClick={() => setCategory("Knowledge")}>
								&nbsp;Knowledge
							</div>
							<div onClick={() => setCategory("Skill")}>&nbsp;Skill</div>
							<div onClick={() => setCategory("QnA")}>&nbsp;QnA</div>
						</div>
					</div>
					<div
						className={postText ? "share-btn active" : "share-btn"}
						onClick={submitHandler}
					>
						<h4 className={postText ? "hover-link" : ""}>Share</h4>
					</div>
				</div>
			</div>
			{/* create-post section end  */}
		</>
	);
};

export default CreatePost;
