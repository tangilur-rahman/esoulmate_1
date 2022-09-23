import "./Liked.css";

const Liked = () => {
	return (
		<>
			{/* liked section start  */}
			<div className="liked-container">
				<div className="liked-by">
					<span>
						<img
							src="/assets/images/profile/tangil.png"
							className="img-fluid"
							alt="profile-img"
						/>
					</span>
					<span>
						<img
							src="/assets/images/profile/developer-4.png"
							className="img-fluid"
							alt="profile-img"
						/>
					</span>
					<span>
						<img
							src="/assets/images/profile/developer-5.png"
							className="img-fluid"
							alt="profile-img"
						/>
					</span>

					<p>
						Liked by <b>Tangilur Rahman</b> and <b>2,323 others</b>
					</p>
				</div>
			</div>
			{/* liked section end  */}
		</>
	);
};

export default Liked;
