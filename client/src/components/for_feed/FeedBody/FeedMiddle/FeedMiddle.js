// external components
import { useState } from "react";

// internal components
import CreatePost from "./components/CreatePost/CreatePost";
import Posts from "./components/Posts/Posts";
import Stories from "./components/Stories/Stories";
import "./FeedMiddle.css";

const FeedMiddle = () => {
	// for getting all follower's posts
	const [getPostDocs, setPostDocs] = useState([]);

	return (
		<>
			{/* **** feed-middle start **** */}
			<div className="col-6 p-0 feed-middle">
				<Stories />
				<CreatePost />
				<Posts getPostDocs={getPostDocs} />
			</div>
			{/* **** feed-middle end **** */}
		</>
	);
};

export default FeedMiddle;
