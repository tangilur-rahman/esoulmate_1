import Posts from "../../../for_feed/FeedBody/FeedMiddle/components/Posts/Posts";
import "./BookmarksTab.css";

const BookmarksTab = () => {
	return (
		<>
			<div className="bookmarks-tab-container">
				<h5>Bookmarks</h5>
				<div className="bookmarks row row-cols-auto">
					<Posts />
				</div>
			</div>
		</>
	);
};

export default BookmarksTab;
