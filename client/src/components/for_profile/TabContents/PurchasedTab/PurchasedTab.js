import Posts from "../../../for_feed/FeedBody/FeedMiddle/components/Posts/Posts";
import "./PurchasedTab.css";

const PurchasedTab = () => {
	return (
		<>
			<div className="purchased-tab-container">
				<h5>Purchased</h5>
				<div className="purchased row row-cols-auto">
					<Posts />
				</div>
			</div>
		</>
	);
};

export default PurchasedTab;
