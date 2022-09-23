import Picker from "emoji-picker-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./CommentBox.css";

// own components
import DisplayReply from "./components/DisplayReply";
import CommentInputReply from "./components/CommentInputReply/CommentInputReply";

const CommentBox = () => {
	const [replyLove, setReplyLove] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiToggle, setEmojiToggle] = useState(false);

	// for get comment
	const [comment, setComment] = useState("");

	// for reply toggle
	const [displayReply, setDisplayReply] = useState(false);

	// for reply-input toggle
	const [replyInput, setReplyInput] = useState(false);

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
			{/* recent-comment start  */}
			<div className="recent-comment">
				<img
					src="/assets/images/profile/tangil.png"
					alt="profile-img"
					className="img-fluid profile-photo"
				/>

				<div className="comment-box">
					<div className="comment">
						<h6>Tangilur Rahman</h6>
						<p>What a beautiful moment!</p>
						<div className="count-react">
							<i className="bi bi-heart-fill">
								<span>5</span>
							</i>
						</div>
					</div>

					<div className="react">
						<span onClick={() => setReplyLove(!replyLove)}>
							{replyLove ? (
								<i className="bi bi-heart-fill active" id="reply-like"></i>
							) : (
								<i className="bi bi-suit-heart inactive" id="reply-dislike"></i>
							)}
						</span>

						<p id="for-reply" onClick={() => setReplyInput(!replyInput)}>
							Reply
						</p>

						<p>7h</p>
					</div>
					{replyInput ? <CommentInputReply /> : ""}

					{/* displayReply start  */}
					<div
						className={
							displayReply
								? "comment-toggle-container active"
								: "comment-toggle-container"
						}
					>
						{displayReply ? (
							<h6 onClick={() => setDisplayReply(!displayReply)}>
								Hide <span>3</span> replies
							</h6>
						) : (
							<h6 onClick={() => setDisplayReply(!displayReply)}>
								View <span>3</span> replies from <b>Tangilur</b> & <b>Others</b>
							</h6>
						)}

						{displayReply ? <DisplayReply /> : ""}
					</div>
					{/* displayReply end  */}
				</div>
			</div>
			{/* recent-comment end  */}

			{/* comment-input start  */}
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
								width: "50%"
							}}
						/>
					)}
				</div>
			</div>
			{/* comment-input end  */}
		</>
	);
};

export default CommentBox;
