import "./Video.css";

const Video = ({ video }) => {
	return (
		<video
			src={video}
			controls="controls"
			controlsList="nodownload"
			autoPlay={true}
			muted
			className="for-video"
		/>
	);
};

export default Video;
