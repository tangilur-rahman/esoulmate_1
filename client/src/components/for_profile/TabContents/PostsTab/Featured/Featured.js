import "./Featured.css";

const Featured = () => {
	return (
		<>
			<div className="featured-container">
				<h5>Featured</h5>
				<img src="/assets/dummy/dummy-1.jpg" alt="feature-img" />

				<div className="featured-btn">
					<button type="button" className="btn">
						<span className="hover-link">Add your featured</span>
						{/* <span className="hover-link">Edit your featured</span> */}
					</button>
				</div>
			</div>
		</>
	);
};

export default Featured;
