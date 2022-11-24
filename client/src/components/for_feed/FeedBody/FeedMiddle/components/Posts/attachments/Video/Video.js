// external components

// internal components
import "./Video.css";

const Video = ({ video }) => {
	return (
		<>
			{video.map((value, index) => {
				return (
					<video
						src={`/uploads/attachments/${value}`}
						controls="controls"
						controlsList="nodownload"
						autoPlay={true}
						muted
						className="for-video"
						key={index}
					/>
				);
			})}
		</>
	);
};

export default Video;
