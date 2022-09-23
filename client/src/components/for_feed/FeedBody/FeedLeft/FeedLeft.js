import { useState } from "react";
import "./FeedLeft.css";

const FeedLeft = () => {
	// for attach active class
	const [feed, setFeed] = useState(true);
	const [page, setPage] = useState(false);
	const [explore, setExplore] = useState(false);
	const [bookmark, setBookmark] = useState(false);
	const [wishlist, setWishlist] = useState(false);
	const [purchase, setPurchase] = useState(false);
	const [sitting, setSitting] = useState(false);

	const feedClicked = () => {
		setFeed(true);
		setPage(false);
		setExplore(false);
		setBookmark(false);
		setWishlist(false);
		setPurchase(false);
		setSitting(false);
	};

	const pageClicked = () => {
		setFeed(false);
		setPage(true);
		setExplore(false);
		setBookmark(false);
		setWishlist(false);
		setPurchase(false);
		setSitting(false);
	};

	const exploreClicked = () => {
		setFeed(false);
		setPage(false);
		setExplore(true);
		setBookmark(false);
		setWishlist(false);
		setPurchase(false);
		setSitting(false);
	};

	const bookmarkClicked = () => {
		setFeed(false);
		setPage(false);
		setExplore(false);
		setBookmark(true);
		setWishlist(false);
		setPurchase(false);
		setSitting(false);
	};

	const wishlistClicked = () => {
		setFeed(false);
		setPage(false);
		setExplore(false);
		setBookmark(false);
		setWishlist(true);
		setPurchase(false);
		setSitting(false);
	};

	const purchaseClicked = () => {
		setFeed(false);
		setPage(false);
		setExplore(false);
		setBookmark(false);
		setWishlist(false);
		setPurchase(true);
		setSitting(false);
	};

	const sittingClicked = () => {
		setFeed(false);
		setPage(false);
		setExplore(false);
		setBookmark(false);
		setWishlist(false);
		setPurchase(false);
		setSitting(true);
	};

	return (
		<>
			{/* **** feed-left start **** */}
			<div className="col-2 p-0 feed-left">
				{/* user-info section start  */}
				<div className="user-info">
					<img
						src="/assets/images/profile/tangil.png"
						alt="profile-img"
						className="img-fluid profile-photo"
					/>
					<div className="user-name">
						<h5>Tangilur</h5>
						<p>@tangilur</p>
					</div>
				</div>
				{/* user-info section end  */}

				{/* sidebar start  */}
				<div className="sidebar-container">
					<span className={feed ? "feed-active" : null} onClick={feedClicked}>
						<i className="bi bi-rss"></i>
						<h5>News Feed</h5>
					</span>

					<span className={page ? "page-active" : null} onClick={pageClicked}>
						<i className="bi bi-paperclip"></i>
						<h5>Pages</h5>
					</span>

					<span
						className={explore ? "explore-active" : null}
						onClick={exploreClicked}
					>
						<i className="bi bi-compass"></i>
						<h5>Explore</h5>
					</span>

					<span
						className={bookmark ? "bookmark-active" : null}
						onClick={bookmarkClicked}
					>
						<i className="bi bi-bookmark-check"></i>
						<h5>Bookmark</h5>
					</span>

					<span
						className={wishlist ? "wishlist-active" : null}
						onClick={wishlistClicked}
					>
						<i className="bi bi-cart4"></i>
						<h5>Wishlist</h5>
					</span>

					<span
						className={purchase ? "purchase-active" : null}
						onClick={purchaseClicked}
					>
						<i className="bi bi-bag-heart"></i>
						<h5>Purchase</h5>
					</span>

					<span
						className={sitting ? "sitting-active" : null}
						onClick={sittingClicked}
					>
						<i className="bi bi-gear"></i>
						<h5>Settings</h5>
					</span>
				</div>
				{/*  sidebar end  */}

				<label htmlFor="create-post" className="create-post-btn">
					Create Post
				</label>
			</div>
			{/* **** feed-left end **** */}
		</>
	);
};

export default FeedLeft;
