import "./AudioTab.css";
import Audio from "../../../for_feed/FeedBody/FeedMiddle/components/Posts/attachments/Audio/Audio";

import audios from "./../../../../dummy-data/audios.json";

const AudioTab = () => {
	return (
		<>
			<div className="audio-tab-container">
         <h5>Audio</h5>
				<div className="audio row row-cols-auto">
					{audios &&
						audios.map((value, index) => {
							return (
								<div key={index}>
									<Audio audio={value.audio} />
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default AudioTab;
