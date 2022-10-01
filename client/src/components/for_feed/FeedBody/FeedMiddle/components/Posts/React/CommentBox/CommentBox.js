// external components
import Picker from "emoji-picker-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../../../../ContextApi";
import "./CommentBox.css";

// own components
import CommentInputReply from "./components/CommentInputReply/CommentInputReply";
import CommentReact from "./components/CommentReact/CommentReact";
import DisplayReply from "./components/DisplayReply";

const CommentBox = ({ comments, user_id, post_id }) => {
	// for getting current-user
	const { currentUser, setUpdatePost } = GetContextApi();

	// eslint-disable-next-line no-unused-vars
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiToggle, setEmojiToggle] = useState(false);

	// for get comment
	const [getComment, setComment] = useState("");

	// for reply toggle
	const [displayReply, setDisplayReply] = useState(false);

	// for reply-input toggle
	const [replyInput, setReplyInput] = useState(false);

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setComment(getComment + emojiObject.emoji);
		setEmojiToggle(false);
	};

	// for submit comment handler start
	const submitHandler = async () => {
		if (getComment) {
			try {
				const response = await fetch(`/post/comment`, {
					method: "POST",
					body: JSON.stringify({ user_id, post_id, comment: getComment }),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					setComment("");
					setUpdatePost(Date.now());
					return;
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
			{/* recent-comment start  */}
			{comments.length > 0 && (
				<div className="recent-comment">
					<img
						src={`/uploads/profile-img/${
							comments[comments.length - 1].user_id?.profile_img
						}`}
						alt="profile-img"
						className="img-fluid"
						id="recent-img"
					/>

					<div className="comment-box">
						<div className="comment">
							<h6>{comments[comments.length - 1].user_id?.name}</h6>
							<p>{comments[comments.length - 1].comment}</p>
							<div className="count-react">
								<i className="bi bi-heart-fill">
									<span>5</span>
								</i>
							</div>
						</div>

						<div className="react">
							<span>
								<CommentReact
									user_id={user_id}
									post_id={post_id}
									comments_id={comments[comments.length - 1]._id}
									reaction={comments[comments.length - 1].reaction}
								/>
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
									View <span>3</span> replies from <b>Tangilur</b> &{" "}
									<b>Others</b>
								</h6>
							)}

							{displayReply ? <DisplayReply /> : ""}
						</div>
						{/* displayReply end  */}
					</div>
				</div>
			)}

			{/* recent-comment end  */}

			{/* comment-input start  */}
			<div className="comment-input">
				<img
					src={`/uploads/profile-img/${currentUser.profile_img}`}
					alt="profile-img"
					className="img-fluid user-img"
				/>
				<div className="input-box">
					<TextareaAutosize
						name="for-comment"
						id="for-comment"
						placeholder="Write a comment..."
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
