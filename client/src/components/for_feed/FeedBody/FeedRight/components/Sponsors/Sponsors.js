import "./Sponsors.css";

const Sponsors = () => {
	return (
		<>
			<div className="sponsors-container">
				<h5>
					Sponsors <hr />
				</h5>

				<iframe
					width="100%"
					height="200px"
					src="https://www.youtube.com/embed/JGKAD0K3e1A"
					title="C Programming class 11 (Part 2)"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="sponsor-iframe"
				></iframe>

				<iframe
					width="100%"
					height="200px"
					src="https://www.youtube.com/embed/fXIFwfaIKCU"
					title="Class 8 Video (Part 2)"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="sponsor-iframe"
				></iframe>
			</div>
		</>
	);
};

export default Sponsors;
