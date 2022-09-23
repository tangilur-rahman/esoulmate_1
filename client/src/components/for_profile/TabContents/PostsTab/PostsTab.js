import Intro from "./Intro/Intro";
import "./PostsTab.css";

import CreatePost from "../../../for_feed/FeedBody/FeedMiddle/components/CreatePost/CreatePost";
import Posts from "../../../for_feed/FeedBody/FeedMiddle/components/Posts/Posts";

const PostsTab = () => {
	return (
		<>
			<div className="container-fluid p-0">
				<div className="row  ">
					<div className="post-tab-main-container">
						<div className="col-lg-5  col-12 p-0 post-left-container">
							<Intro />
						</div>
						<div className="col-lg-7 col-12 p-0 post-right-container">
							<CreatePost />
							<Posts />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostsTab;
