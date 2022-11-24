// external components

// internal components
import "./Video.css";

const Video = ({ video }) => {
	return (
		<div className="video-container">
			{video.length > 0 &&
				video.length < 3 &&
				video.map((value, index) => {
					return (
						<video
							src={`/uploads/attachments/${value}`}
							controls="controls"
							controlsList="nodownload"
							autoPlay={true}
							muted
							key={index}
							id={value.length === 1 ? "single-video" : "double-videos"}
						/>
					);
				})}
		</div>
	);
};

export default Video;
