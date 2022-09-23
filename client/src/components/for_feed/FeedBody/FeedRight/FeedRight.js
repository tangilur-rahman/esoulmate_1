//own components
import Hashtags from "./components/Hashtags/Hashtags";
import Sponsors from "./components/Sponsors/Sponsors";
import TrendingPage from "./components/TrendingPage/TrendingPage";

import "./FeedRight.css";

const FeedRight = () => {
	return (
		<>
			{/* **** feed-right start **** */}
			<div className="col-3 p-0 feed-right">
				<Sponsors />
				<TrendingPage />
				<Hashtags />
			</div>
			{/* **** feed-right end **** */}
		</>
	);
};

export default FeedRight;
