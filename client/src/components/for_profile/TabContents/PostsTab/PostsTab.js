// external components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import Posts from "../../../for_feed/FeedBody/FeedMiddle/components/Posts/Posts";
import Featured from "./Featured/Featured";
import Interested from "./Interested/Interested";

import "./PostsTab.css";

const PostsTab = ({ profile_id }) => {
	// for redirect
	const Navigate = useNavigate();

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
	}, []);
	// for fetching specific profile's all posts end

	// scroll stop when model is opened start
	// for features popup toggle
	const [feaPopT, setFeaPopT] = useState("");

	useEffect(() => {
		if (feaPopT) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	}, [feaPopT]);
	// scroll stop when model is opened start

	return (
		<>
			<div className="container-fluid p-0">
				<div className="row m-0 post-tab-main-container">
					<div className="col-lg-3  col-12 p-0 post-left-container">
						<Interested />
					</div>
					<div className="col-lg-5 col-12 p-0 post-middle-container">
						<Posts getPostDocs={getPostDocs} />
					</div>

					<div
						className="col-lg-3 col-12 p-0 post-right-container"
						id={feaPopT ? "" : "sticky"}
					>
						<Featured
							feaPopT={feaPopT}
							setFeaPopT={setFeaPopT}
							profile_id={profile_id}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostsTab;
