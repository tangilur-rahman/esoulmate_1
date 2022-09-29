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
			{getPostDocs ? (
				getPostDocs.posts
					.map((value, index) => {
						return (
							<div className="post-container" key={index}>
								{/* post section start  */}
								<Header
									profile={getPostDocs.user_id.profile_img}
									name={getPostDocs.user_id.name}
									header={value.header}
									time={value.time}
									privacy={value.privacy}
								/>

								<Description description={value.text} />

								{/* attachment section start  */}
								<div className="attachment-main-container">
									{(value.file_type === "image" && (
										<Image image={value.attachment} />
									)) ||
										(value.file_type === "video" && (
											<Video video={value.attachment} />
										)) ||
										(value.file_type === "audio" && (
											<Audio audio={value.attachment} />
										)) ||
										(value.file_type === "document" && (
											<Pdf pdf={value.attachment} />
										))}
								</div>
								{/* attachment section end  */}

								<React
									user_id={getPostDocs.user_id}
									post_id={value._id}
									reaction={value.reaction}
								/>
								{/* post section end  */}
							</div>
						);
					})
					.reverse()
			) : (
				<p>No Posts</p>
			)}
		</>
	);
};

export default Posts;
