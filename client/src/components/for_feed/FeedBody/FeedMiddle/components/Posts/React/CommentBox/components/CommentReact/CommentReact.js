// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../../../../../../ContextApi";
import "./CommentReact.css";
import ReactionEmoji from "./ReactionEmoji/ReactionEmoji";

const CommentReact = ({ user_id, post_id, comments_id, reaction }) => {
	// for getting current-user
	const { currentUser, setUpdatePost } = GetContextApi();

	// for remove duplicate values from reaction array
	const uniqueArray = [
		...new Map(reaction?.map((v) => [v.user_id._id, v])).values()
	];

	// check existence reaction included current-user or not
	const existCurrentUser = uniqueArray.filter(
		(value) => value.user_id._id === currentUser._id
	);

	// for getting react
	const [getReact, setReact] = useState(existCurrentUser[0]?.react || "");

	// for reaction-section toggle
	const [reactT, setReactT] = useState("");

	// for reaction submit on database start
	const submitHandler = async () => {
		if (getReact) {
			try {
				const response = await fetch(`/post/comment/react`, {
					method: "POST",
					body: JSON.stringify({
						user_id,
						post_id,
						comments_id,
						react: getReact
					}),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
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

	useEffect(() => {
		submitHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getReact]);
	// for reaction submit on database end

	return (
		<>
			{/* react-container start  */}
			<div className="comment-react-container">
				{/* react-icons start  */}
				<div className="com-react-icons">
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
								<i>
									<img src="/assets/emojis/empty-love.png" alt="initial-icon" />
								</i>
							)}
							<ReactionEmoji
								reactT={reactT}
								setReactT={setReactT}
								setReact={setReact}
							/>
						</span>
					</div>
				</div>
				{/* react-icons end  */}
			</div>
		</>
	);
};

export default CommentReact;
