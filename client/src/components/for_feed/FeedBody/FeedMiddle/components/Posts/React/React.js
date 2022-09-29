// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "./../../../../../../../ContextApi";
import CommentBox from "./CommentBox/CommentBox";
import Liked from "./Liked/Liked";
import "./React.css";
import ReactionEmoji from "./ReactionEmoji/ReactionEmoji";

const React = ({ user_id, post_id, reaction }) => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// for remove duplicate values from reaction array
	const uniqueArray = [
		...new Map(reaction.map((v) => [v.user_id, v])).values()
	];

	// check existence reaction included current-user or not
	const existCurrentUser = uniqueArray.filter(
		(value) => value.user_id === currentUser._id
	);

	// for getting react
	const [getReact, setReact] = useState(
		existCurrentUser.length > 0 ? existCurrentUser[0]?.react : ""
	);

	// for reaction-section toggle
	const [reactT, setReactT] = useState("");

	// bookmark toggle
	const [bookmark, setBookmark] = useState(false);

	// for reaction submit on database start
	const submitHandler = async () => {
		if (getReact) {
			try {
				const response = await fetch(`/post/react`, {
					method: "POST",
					body: JSON.stringify({ user_id, post_id, react: getReact }),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
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

	useEffect(() => {
		submitHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getReact]);
	// for reaction submit on database end

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

					<div className="right" onClick={() => setBookmark(!bookmark)}>
						{bookmark ? (
							<i
								class="bi bi-bookmark-heart-fill active"
								id="fill-bookmark"
							></i>
						) : (
							<i
								className="bi bi-bookmark-heart inactive"
								id="empty-bookmark"
							></i>
						)}
					</div>
				</div>
				{/* react-icons end  */}

				<Liked />

				{/* comments section start  */}
				<div className="comment-container">
					<div className="all-comments">
						View <span>235</span> previous comments
						<hr />
					</div>
					<CommentBox />
				</div>
				{/* comments section end  */}

				{/* react-container end  */}
			</div>
		</>
	);
};

export default React;
