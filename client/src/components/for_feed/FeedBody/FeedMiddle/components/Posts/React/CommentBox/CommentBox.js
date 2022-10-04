// external components
import Picker from "emoji-picker-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import TimeAgo from "timeago-react";

// internal components
import { GetContextApi } from "../../../../../../../../ContextApi";
import "./CommentBox.css";

// own components
import CommentReact from "./components/CommentReact/CommentReact";
import CommentInputReply from "./components/for_reply/CommentInputReply/CommentInputReply";
import DisplayReply from "./components/for_reply/DisplayReply/DisplayReply";

const CommentBox = ({ comments, user_id, post_id, updating }) => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// eslint-disable-next-line no-unused-vars
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiToggle, setEmojiToggle] = useState(false);

	// for get comment
	const [getComment, setComment] = useState("");

	// for displaying reply toggle
	const [displayReplyT, setDisplayReplyT] = useState(false);

	// for reply-input toggle
	const [replyInputT, setReplyInputT] = useState(false);

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setComment(getComment + emojiObject.emoji);
		setEmojiToggle(false);
	};

	// for submit comment handler start
	const submitHandler = async () => {
		if (getComment) {
			try {
				const response = await fetch("/post/comment", {
					method: "POST",
					body: JSON.stringify({
						user_id: user_id._id,
						post_id,
						comment: getComment
					}),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					updating();
					setComment("");
					setReact("");
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

	// for remove duplicate values from reaction array
	const uniqueArray =
		comments?.length > 0
			? [
					...new Map(
						comments[comments.length - 1].reaction?.map((v) => [
							v.user_id._id,
							v
						])
					).values()
			  ]
			: [];

	// for creating group by base on react start
	const groupBy = (arr, property) => {
		return arr.reduce((acc, cur) => {
			acc[cur[property]] = [...(acc[cur[property]] || []), cur];
			return acc;
		}, {});
	};

	const getGroupBy = groupBy(uniqueArray, "react");
	// for creating group by base on react end

	// for sorting & getting first maximum start
	const likeLen = getGroupBy.like ? getGroupBy.like.length : 0;
	const loveLen = getGroupBy.love ? getGroupBy.love.length : 0;
	const wowLen = getGroupBy.wow ? getGroupBy.wow.length : 0;
	const hahaLen = getGroupBy.haha ? getGroupBy.haha.length : 0;
	const clapLen = getGroupBy.clap ? getGroupBy.clap.length : 0;
	const appreciateLen = getGroupBy.appreciate
		? getGroupBy.appreciate.length
		: 0;
	const dislikeLen = getGroupBy.dislike ? getGroupBy.dislike.length : 0;

	const getMaximum = [
		{ react: "like", len: likeLen },
		{ react: "love", len: loveLen },
		{ react: "wow", len: wowLen },
		{ react: "haha", len: hahaLen },
		{ react: "clap", len: clapLen },
		{ react: "appreciate", len: appreciateLen },
		{ react: "dislike", len: dislikeLen }
	]
		.sort((a, b) => a.len - b.len)
		.reverse();
	// for sorting & getting first maximum end

	// check existence reaction included current-user or not
	const existCurrentUser =
		comments.length > 0
			? comments[comments.length - 1].reaction.filter(
					(value) => value.user_id === currentUser._id
			  )
			: [];

	// for getting react
	const [getReact, setReact] = useState(existCurrentUser[0]?.react || "");

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
							<h6>{comments[comments.length - 1].user_id.name}</h6>
							<p>{comments[comments.length - 1].comment}</p>
							<div className="count-react">
								{getMaximum[0]?.len > 0 && (
									<span>
										<img
											src={`/assets/emojis/${getMaximum[0].react}.png`}
											className="img-fluid"
											alt="profile-img"
										/>

										<h6>{uniqueArray.length}</h6>
									</span>
								)}
							</div>
						</div>

						<div className="react">
							<span>
								<CommentReact
									user_id={user_id}
									post_id={post_id}
									comments_id={comments[comments.length - 1]._id}
									getReact={getReact}
									setReact={setReact}
									updating={updating}
								/>
							</span>

							<p id="for-reply" onClick={() => setReplyInputT(!replyInputT)}>
								Reply
							</p>

							<p>{<TimeAgo datetime={comments[comments.length - 1].time} />}</p>
						</div>
						{replyInputT && (
							<CommentInputReply
								currentUser={currentUser}
								user_id={user_id}
								post_id={post_id}
								comments_id={comments[comments.length - 1]._id}
								updating={updating}
							/>
						)}

						{/* displayReply start  */}
						{comments[comments.length - 1].replays?.length > 0 && (
							<div
								className={
									displayReplyT
										? "comment-toggle-container active"
										: "comment-toggle-container"
								}
							>
								{displayReplyT ? (
									<h6 onClick={() => setDisplayReplyT(!displayReplyT)}>
										Hide &nbsp;
										<span>{comments[comments.length - 1].replays?.length}</span>
										&nbsp;
										{comments[comments.length - 1].replays?.length > 1
											? "replies"
											: "reply"}
									</h6>
								) : (
									<h6 onClick={() => setDisplayReplyT(!displayReplyT)}>
										View&nbsp;
										<span>{comments[comments.length - 1].replays?.length}</span>
										&nbsp;
										{comments[comments.length - 1].replays?.length > 1
											? "replies"
											: "reply"}
										&nbsp; from&nbsp;
										{comments[comments.length - 1].replays?.length > 1 ? (
											<b>
												{/* {
													comments[comments.length - 1]?.replays.slice(-2)[0]
														?.user_id.name
												} */}
												later & others
											</b>
										) : (
											<>
												<b>
													{/* {
														comments[comments.length - 1]?.replays.slice(-2)[0]
															?.user_id.name
													} */}
													later
												</b>
											</>
										)}
									</h6>
								)}

								{displayReplyT && (
									<DisplayReply comments={comments[comments.length - 1]} />
								)}
							</div>
						)}

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
