// external components

// internal components
import Audio from "./attachments/Audio/Audio";
import Image from "./attachments/Image/Image";
import Pdf from "./attachments/Pdf/Pdf";
import Video from "./attachments/Video/Video";
import Description from "./Description/Description";
import Header from "./Header/Header";
import React from "./React/React";

import "./Post.css";

const Posts = ({ getPosts }) => {
	return (
		<>
			{/* rendering section start */}

			{getPosts &&
				getPosts.map((value) => {
					const { profile, name, time, privacy, description, post, type, id } =
						value;
					return (
						<div className="post-container" key={id}>
							{/* post section start  */}
							<Header
								profile={profile}
								name={name}
								time={time}
								privacy={privacy}
							/>

							<Description description={description} />

							{/* attachment section start  */}
							<div className="attachment-main-container">
								{(type === "image" && <Image image={post} />) ||
									(type === "video" && <Video video={post} />) ||
									(type === "audio" && <Audio audio={post} />) ||
									(type === "document" && <Pdf pdf={post} />)}
							</div>
							{/* attachment section end  */}

							<React />
							{/* post section end  */}
						</div>
					);
				})}

			{/* rendering section start */}
		</>
	);
};

export default Posts;
