import Picker from "emoji-picker-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./CommentInputReply.css";

const CommentInputReply = () => {
	// eslint-disable-next-line no-unused-vars
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiToggle, setEmojiToggle] = useState(false);

	// for get comment
	const [comment, setComment] = useState("");

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setComment(comment + emojiObject.emoji);
		setEmojiToggle(false);
	};

	const onChange = (event) => {
		setComment(event.target.value);
	};

	const onKeyDown = (event) => {
		if (event.key === "Enter" && event.shiftKey) {
		} else if (event.key === "Enter") {
			event.preventDefault();
			setComment("");
		}
	};

	return (
		<>
			{/* comment-input start  */}

			<div className="comment-input-reply">
				<div className="comment-input">
					<img
						src="/assets/images/profile/tangil.png"
						alt="profile-img"
						className="profile-photo img-fluid"
					/>
					<div className="input-box">
						<TextareaAutosize
							name="for-comment"
							id="for-comment"
							placeholder="Write a comment..."
							rows="1"
							onFocus={() => setEmojiToggle(false)}
							onChange={onChange}
							value={comment}
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
