import { useState } from "react";

//own components
import CommentInputReply from "./CommentInputReply/CommentInputReply";

const DisplayReply = () => {
	// for love reaction
	const [replyLove, setReplyLove] = useState(false);

	// for reply-input toggle
	const [replyInput, setReplyInput] = useState(false);

	return (
		<>
			{/* comment's reply display start  */}
			<div className="recent-comment">
				<img
					src="/assets/images/profile/developer-2.png"
					alt="profile-img"
					className="img-fluid profile-photo"
				/>

				<div className="comment-box">
					<div className="comment">
						<h6>Tauheed</h6>
						<p>It's absolutely true</p>
						<div className="count-react">
							<i className="bi bi-heart-fill">
								<span>2</span>
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
				</div>
			</div>
			{/* comment's reply display end  */}
		</>
	);
};

export default DisplayReply;
