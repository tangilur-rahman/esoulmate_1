// external components

// internal components
import Audio from "./attachments/Audio/Audio";
import Image from "./attachments/Image/Image";
import Pdf from "./attachments/Pdf/Pdf";
import Video from "./attachments/Video/Video";
import Description from "./Description/Description";
import Header from "./Header/Header";
import React from "./React/React";

import "./Posts.css";

const Posts = ({ getPostDocs }) => {
	return (
		<>
			{getPostDocs.length > 0 ? (
				getPostDocs
					?.map((value, index) => {
						return (
							<div className="post-container" key={index}>
								{/* post section start  */}
								<Header
									profile={value.user_id.profile_img}
									name={value.user_id.name}
									category={value.category}
									time={value.time}
									privacy={value.privacy}
								/>

								<Description description={value?.text} />

								{/* attachment section start  */}
								<div className="attachment-main-container">
									{(value.file_type === "image" && (
										<Image image={value.attachments} />
									)) ||
										(value.file_type === "video" && (
											<Video video={value.attachments} />
										)) ||
										(value.file_type === "audio" && (
											<Audio audio={value.attachments} />
										)) ||
										(value.file_type === "document" && (
											<Pdf pdf={value.attachments} />
										))}
								</div>
								{/* attachment section end  */}

								<React
									user_id={value.user_id}
									post_id={value._id}
									reaction={value.reaction}
									comments={value.comments}
								/>
								{/* post section end  */}
							</div>
						);
					})
					.reverse()
			) : (
				<p id="empty-post-message">Empty Post</p>
			)}
		</>
	);
};

export default Posts;
