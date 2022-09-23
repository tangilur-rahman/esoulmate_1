import { useState } from "react";
import "./React.css";

//own components
import Liked from "./Liked/Liked";
import CommentBox from "./CommentBox/CommentBox";

const React = () => {
	const [love, setLove] = useState(false);
	const [bookmark, setBookmark] = useState(false);

	return (
		<>
			{/* react-container start  */}
			<div className="react-container">
				{/* react-icons start  */}
				<div className="react-icons">
					<div className="left">
						<span onClick={() => setLove(!love)}>
							{love ? (
								<i className="bi bi-heart-fill active" id="fill-love"></i>
							) : (
								<i className="bi bi-suit-heart inactive" id="empty-love"></i>
							)}
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
