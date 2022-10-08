// external components
import Picker from "emoji-picker-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

// internal components
import "./CommentInputReply.css";

const CommentInputReply = ({
	currentUser,
	user_id,
	post_id,
	comments_id,
	updating
}) => {
	// eslint-disable-next-line no-unused-vars
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiToggle, setEmojiToggle] = useState(false);

	// for get comment
	const [getComment, setComment] = useState("");

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setComment(getComment + emojiObject.emoji);
		setEmojiToggle(false);
	};

	// for submit comment handler start
	const submitHandler = async () => {
		if (getComment) {
			try {
				const response = await fetch("/post/comment/reply", {
					method: "POST",
					body: JSON.stringify({
						user_id: user_id._id,
						post_id,
						comment: getComment,
						comments_id
					}),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					updating();
					setComment("");
				} else {
					toast.error(result.error, {
						position: "top-right",
						theme: "colored",
						autoClose: 2500
					});
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
			}
		}
	};

	const onKeyDown = (event) => {
		if (event.key === "Enter" && event.shiftKey) {
			return;
		} else if (event.key === "Enter") {
			submitHandler();
		}
	};
	// for submit comment handler end

	return (
		<>
			{/* comment-input start  */}
			<div className="comment-input-reply">
				<div className="comment-input">
					<img
						src={`/uploads/profile-img/${currentUser.profile_img}`}
						alt="profile-img"
						className="img-fluid"
						id="profile-img"
					/>
					<div className="input-box">
						<TextareaAutosize
							name="for-comment"
							id="for-comment"
							placeholder="Reply..."
							rows="1"
							onFocus={() => setEmojiToggle(false)}
							onChange={(e) => setComment(e.target.value)}
							value={getComment}
							autoComplete="off"
							onKeyDown={onKeyDown}
						></TextareaAutosize>

						<i
							className="bi bi-emoji-heart-eyes"
							onClick={() => setEmojiToggle(!emojiToggle)}
						></i>

						{emojiToggle && (
							<Picker
								onEmojiClick={onEmojiClick}
								pickerStyle={{
									position: "absolute",
									bottom: "40px",
									width: "75%"
								}}
							/>
						)}
					</div>
				</div>
			</div>
			{/* comment-input end  */}
		</>
	);
};

export default CommentInputReply;
