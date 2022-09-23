import "./FeedMiddle.css";

// own components
import Stories from "./components/Stories/Stories";
import CreatePost from "./components/CreatePost/CreatePost";
import Posts from "./components/Posts/Posts";

const FeedMiddle = () => {
	return (
		<>
			{/* **** feed-middle start **** */}
			<div className="col-6 p-0 feed-middle">
				<Stories />
				<CreatePost />
				<Posts />
			</div>
			{/* **** feed-middle end **** */}
		</>
	);
};

export default FeedMiddle;
