import "./TrendingPage.css";
import pageFollow from "../../../../../../dummy-data/trendingPage.json";

const TrendingPage = () => {
	return (
		<>
			<div className="trending-page-container">
				<h5>
					Trending Pages <hr />
				</h5>

				{pageFollow &&
					pageFollow.map((value, index) => {
						return (
							<div className="page" key={index}>
								<div className="page-info">
									<img
										src={value.pagePic}
										alt="page-img"
										className="img-fluid profile-photo"
									/>

									<h6>{value.pageName} </h6>
								</div>

								<button>Follow</button>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default TrendingPage;
