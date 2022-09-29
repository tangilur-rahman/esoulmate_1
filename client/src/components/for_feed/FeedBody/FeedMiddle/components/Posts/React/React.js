// external components
import { useState } from "react";
import "./React.css";

// internal components
import CommentBox from "./CommentBox/CommentBox";
import Liked from "./Liked/Liked";
import ReactionEmoji from "./ReactionEmoji/ReactionEmoji";

const React = () => {
	// for reaction-section toggle
	const [reactT, setReactT] = useState("");

	// for getting react
	const [getReact, setReact] = useState("");
	const [bookmark, setBookmark] = useState(false);

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
									<i className="fa-solid fa-thumbs-up" id="like"></i>
								)) ||
								(getReact === "love" && (
									<i className="bi bi-heart-fill" id="love"></i>
								)) ||
								(getReact === "wow" && (
									<i className="fa-regular fa-face-surprise" id="wow"></i>
								)) ||
								(getReact === "haha" && (
									<i className="fa-regular fa-face-grin-tears" id="haha"></i>
								)) ||
								(getReact === "clap" && (
									<i className="fa-solid fa-hands-clapping" id="clap"></i>
								)) ||
								(getReact === "appreciate" && <i id="appreciate">🎉</i>) ||
								(getReact === "dislike" && (
									<i className="fa-solid fa-thumbs-down" id="dislike"></i>
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
