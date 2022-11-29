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

			{video.length === 3 && (
				<div className="when-third-videos">
					{video.map((value, index) => {
						return (
							<video
								src={`/uploads/attachments/${value}`}
								controls="controls"
								controlsList="nodownload"
								autoPlay={true}
								muted
								key={index}
								id={
									(index === 0 ? "first-video" : "") ||
									(index === 1 ? "second-video" : "") ||
									(index === 2 ? "third-video" : "")
								}
							/>
						);
					})}
				</div>
			)}

			{video.length >= 4 && (
				<div className="when-forth-videos">
					{video.map((value, index) => {
						return (
							<video
								src={`/uploads/attachments/${value}`}
								controls="controls"
								controlsList="nodownload"
								autoPlay={true}
								muted
								key={index}
								className={
									index === 3 && video.length > 4 ? "when-counter" : ""
								}
								id={
									(index === 0 ? "first-video" : "") ||
									(index === 1 ? "second-video" : "") ||
									(index === 2 ? "third-video" : "") ||
									(index === 3 ? "forth-video" : "")
								}
							/>
						);
					})}
					{video.length > 4 && <h5 id="counter">{`+${video.length - 4}`}</h5>}
				</div>
			)}
		</div>
	);
};

export default Video;
