// external components
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

	// cover or profile pic submit handler start
	const submitHandler = async (e) => {
		e.preventDefault();
		if (getCoverImg || getProfileImg) {
			const formData = new FormData();
			formData.append("file", getCoverImg ? getCoverImg : getProfileImg);

			try {
				const response = await fetch(
					`/post/profile?whichOne=${getCoverImg ? "cover" : "profile"}`,
					{
						method: "POST",
						body: formData
					}
				);

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

					<h6>{currentUser.name}</h6>
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
						<span className="hover-link">Upload</span>
					</button>
				</div>
			</div>
			{/* create-post section end  */}
		</>
	);
};

export default CreatePost;
