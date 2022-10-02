// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "./../../../../../../../ContextApi";
import CommentBox from "./CommentBox/CommentBox";
import Liked from "./Liked/Liked";
import "./React.css";
import ReactionEmoji from "./ReactionEmoji/ReactionEmoji";

const React = ({ user_id, post_id, reaction, comments }) => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// for getting & updating reaction
	const [getReaction, setReaction] = useState(reaction);

	// for getting & updating comments
	const [updatedComment, setUpdatedComment] = useState(comments);

	// check existence reaction included current-user or not
	const existCurrentUser = getReaction.filter(
		(value) => value.user_id._id === currentUser._id
	);

	// for getting react
	const [getReact, setReact] = useState(existCurrentUser[0]?.react || "");

	// for reaction-section toggle
	const [reactT, setReactT] = useState("");

	// bookmark toggle
	const [bookmark, setBookmark] = useState(false);

	// for reaction submit on database start
	const submitHandler = async () => {
		if (getReact) {
			try {
				const response = await fetch("/post/react", {
					method: "POST",
					body: JSON.stringify({ user_id, post_id, react: getReact }),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					updating();
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

	useEffect(() => {
		submitHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getReact]);
	// for reaction submit on database end

	// for getting specific post when it updating start
	const updating = async () => {
		try {
			const response = await fetch(`/post/updating/${user_id._id}/${post_id}`);

			const result = await response.json();

			if (response.status === 200) {
				setReaction(result.reaction);
				setUpdatedComment(result.comments);
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
	};
	// for getting specific post when it updating end

	return (
		<>
			{/* react-container start  */}
			<div className="react-container">
				{/* react-icons start  */}
				<div className="react-icons">
					<div className="left">
						<span onMouseEnter={() => setReactT(true)}>
							{getReact ? (
								(getReact === "like" && (
									<i id="like">
										<img src="/assets/emojis/like.png" alt="like-icon" />
									</i>
								)) ||
								(getReact === "love" && (
									<i id="love">
										<img src="/assets/emojis/love.png" alt="love-icon" />
									</i>
								)) ||
								(getReact === "wow" && (
									<i id="wow">
										<img src="/assets/emojis/wow.png" alt="wow-icon" />
									</i>
								)) ||
								(getReact === "haha" && (
									<i id="haha">
										<img src="/assets/emojis/haha.png" alt="haha-icon" />
									</i>
								)) ||
								(getReact === "clap" && (
									<i id="clap">
										<img src="/assets/emojis/clap.png" alt="clap-icon" />
									</i>
								)) ||
								(getReact === "appreciate" && (
									<i id="appreciate">
										<img
											src="/assets/emojis/appreciate.png"
											alt="appreciate-icon"
										/>
									</i>
								)) ||
								(getReact === "dislike" && (
									<i id="dislike">
										<img src="/assets/emojis/dislike.png" alt="love-icon" />
									</i>
								))
							) : (
								<i className="bi bi-suit-heart" id="empty-love"></i>
							)}
							<ReactionEmoji
								reactT={reactT}
								setReactT={setReactT}
								setReact={setReact}
							/>
						</span>

						<label htmlFor="for-comment">
							<i className="bi bi-chat-heart"></i>
						</label>

						<div className="share">
							<i className="bi bi-share"></i>
						</div>
					</div>

					{currentUser._id !== user_id._id && (
						<div className="right" onClick={() => setBookmark(!bookmark)}>
							{bookmark ? (
								<i
									className="bi bi-bookmark-heart-fill active"
									id="fill-bookmark"
								></i>
							) : (
								<i
									className="bi bi-bookmark-heart inactive"
									id="empty-bookmark"
								></i>
							)}
						</div>
					)}
				</div>
				{/* react-icons end  */}

				{getReaction?.length > 0 && <Liked reaction={getReaction} />}

				{/* comments section start  */}
				<div className="comment-container">
					{updatedComment.length > 1 && (
						<div className="all-comments hover-link">
							View <span>{updatedComment.length - 1}</span> previous &nbsp;
							{updatedComment.length === 2 ? "comment" : "comments"}
							<hr />
						</div>
					)}

					<CommentBox
						comments={updatedComment}
						user_id={user_id}
						post_id={post_id}
						updating={updating}
					/>
				</div>
				{/* comments section end  */}

				{/* react-container end  */}
			</div>
		</>
	);
};

export default React;
