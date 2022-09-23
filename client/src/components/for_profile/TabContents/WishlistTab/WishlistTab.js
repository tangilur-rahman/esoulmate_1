import Posts from "../../../for_feed/FeedBody/FeedMiddle/components/Posts/Posts";
import "./WishlistTab.css";

const WishlistTab = () => {
	return (
		<>
			<div className="wishlist-tab-container">
				<h5>Wishlist</h5>
				<div className="wishlist row row-cols-auto">
					<Posts />
				</div>
			</div>
		</>
	);
};

export default WishlistTab;
