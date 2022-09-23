import "./Hashtags.css";

const Hashtags = () => {
	return (
		<>
			<div className="hashtags-container">
				<h5>
					{" "}
					<i className="bi bi-hash"></i>Trending Hashtags <hr />
				</h5>

				<div className="hashtag">
					<span>
						<i className="bi bi-hash"></i>
						<h5>Web Design</h5>
					</span>

					<span>
						<i className="bi bi-hash"></i>
						<h5>Networking</h5>
					</span>

					<span>
						<i className="bi bi-hash"></i>
						<h5>Android Development</h5>
					</span>
				</div>
			</div>
		</>
	);
};

export default Hashtags;
