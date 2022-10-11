import "./Interested.css";

const Interested = () => {
	return (
		<>
			<div className="interested-container">
				<h5>Interested In</h5>

				<div className="interested-items"></div>

				<div className="interested-btn">
					<button type="button">
						<span className="hover-link">Add your interest</span>
						{/* <span className="hover-link">Edit your interest</span> */}
					</button>
				</div>
			</div>
		</>
	);
};

export default Interested;
