// external components
import { useState } from "react";

// internal components
import CommentInputReply from "./../CommentInputReply/CommentInputReply";

const DisplayReply = ({ comments }) => {
	// for love reaction
	const [replyLove, setReplyLove] = useState(false);

	// for reply-input toggle
	const [replyInput, setReplyInput] = useState(false);

	return (
		<>
			{comments.replays?.length > 0 &&
				comments.replays
					.map((value, index) => {
						return (
							<div className="recent-comment" key={index}>
								<img
									src={`/uploads/profile-img/${value.user_id.profile_img}`}
									alt="profile-img"
									className="img-fluid profile-photo"
								/>

								<div className="comment-box">
									<div className="comment">
										<h6>{value.user_id.name}</h6>
										<p>{value.comment}</p>
										<div className="count-react">
											<i className="bi bi-heart-fill">
												<span>2</span>
											</i>
										</div>
									</div>

									<div className="react">
										<span onClick={() => setReplyLove(!replyLove)}>
											{replyLove ? (
												<i
													className="bi bi-heart-fill active"
													id="reply-like"
												></i>
											) : (
												<i
													className="bi bi-suit-heart inactive"
													id="reply-dislike"
												></i>
											)}
										</span>

										<p
											id="for-reply"
											onClick={() => setReplyInput(!replyInput)}
										>
											Reply
										</p>

										<p>7h</p>
									</div>
									{replyInput ? <CommentInputReply /> : ""}
								</div>
							</div>
						);
					})
					.reverse()}
		</>
	);
};

export default DisplayReply;
