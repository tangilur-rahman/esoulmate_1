import "./VideosTab.css";

import videos from "./../../../../dummy-data/videos.json";

const VideosTab = () => {
	return (
		<>
			<div className="videos-tab-container">
				<h5>Videos</h5>
				<div className="videos row row-cols-sm-auto row-cols-md-2 ">
					{videos &&
						videos.map((value, index) => {
							return (
								<div key={index}>
									<video src={value.video} autoPlay muted loop></video>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default VideosTab;
