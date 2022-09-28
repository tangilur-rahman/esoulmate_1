// external components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../ContextApi";
import CreatePost from "../../../for_feed/FeedBody/FeedMiddle/components/CreatePost/CreatePost";
import Posts from "../../../for_feed/FeedBody/FeedMiddle/components/Posts/Posts";
import Intro from "./Intro/Intro";

import "./PostsTab.css";

const PostsTab = ({ profile_id }) => {
	// for redirect
	const Navigate = useNavigate();

	// for updating posts when submitted
	const { updatePost } = GetContextApi();

	// for getting all profile's posts
	const [getPostDocs, setPostDocs] = useState("");

	// for fetching specific profile's all posts start
	const fetchingAllPosts = async () => {
		try {
			const response = await fetch(`/post/profile/${profile_id}`);

			const result = await response.json();

			if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});

				setTimeout(() => {
					return Navigate("/");
				}, 3000);
			} else {
				setPostDocs(result ? result : "");
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 2500
			});
			setTimeout(() => {
				return Navigate("/");
			}, 3000);
		}
	};

	useEffect(() => {
		fetchingAllPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updatePost]);
	// for fetching specific profile's all posts end

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
							<Posts getPostDocs={getPostDocs} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostsTab;
