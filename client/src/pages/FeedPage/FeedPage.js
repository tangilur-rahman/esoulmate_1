// external components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import "./FeedPage.css";

// own components
import FeedBody from "../../components/for_feed/FeedBody/FeedBody";
import Navbar from "../../components/Navbar/Navbar";

const FeedPage = () => {
	// for redirect login page
	const Navigate = useNavigate();

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState(true);

	// for get current-user
	const [currentUser, setCurrentUser] = useState("");

	const getCurrentUser = async () => {
		try {
			const response = await fetch("/user");

			const result = await response.json();

			if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				return Navigate("/log-in");
			} else {
				setCurrentUser(result);
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			return Navigate("/log-in");
		}
	};

	useEffect(() => {
		getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for get current-user end

	return (
		<>
			{isLoading ? (
				<div className="loading-animation">
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
				</div>
			) : (
				<div className="container-fluid p-0">
					<Navbar />
					<div className="row feed-body-container">
						<div className="col-11 p-0">
							<FeedBody currentUser={currentUser} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FeedPage;
