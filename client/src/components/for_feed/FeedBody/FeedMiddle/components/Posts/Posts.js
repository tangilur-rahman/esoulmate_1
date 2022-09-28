// external components
import sortArray from "sort-array";

// internal components
import Audio from "./attachments/Audio/Audio";
import Image from "./attachments/Image/Image";
import Pdf from "./attachments/Pdf/Pdf";
import Video from "./attachments/Video/Video";
import Description from "./Description/Description";
import Header from "./Header/Header";
import React from "./React/React";

const Posts = ({ getPostDocs }) => {
	console.log(getPostDocs, "get");

	return (
		<>
			{getPostDocs ? (
				sortArray(getPostDocs.posts, {
					by: "updatedAt",
					order: "desc"
				})?.map((value, index) => {
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
								{(true && <Image image={value.attachment} />) ||
									(value.type === "video" && (
										<Video video={value.attachment} />
									)) ||
									(value.type === "audio" && (
										<Audio audio={value.attachment} />
									)) ||
									(value.type === "document" && <Pdf pdf={value.attachment} />)}
							</div>
							{/* attachment section end  */}

							<React />
							{/* post section end  */}
						</div>
					);
				})
			) : (
				<p>No Posts</p>
			)}
		</>
	);
};

export default Posts;
