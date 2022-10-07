// external components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../ContextApi";
import "./FeedPage.css";

// own components
import FeedBody from "../../components/for_feed/FeedBody/FeedBody";
import Navbar from "../../components/Navbar/Navbar";

const FeedPage = () => {
	// for redirect login page
	const Navigate = useNavigate();

	// for setting current-user
	const { setCurrentUser } = GetContextApi();

	// for loading animation until fetching didn't complete
	const [isLoading, setIsLoading] = useState(true);

	// for fetching current-user handler start
	const getCurrentUser = async () => {
		try {
			const response = await fetch("/user");

			const result = await response.json();

			if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});

				setTimeout(() => {
					return Navigate("/log-in");
				}, 3000);
			} else {
				setCurrentUser(result);
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 2500
			});
			setTimeout(() => {
				return Navigate("/log-in");
			}, 3000);
		}
	};

	useEffect(() => {
		getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for fetching current-user handler start

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
					<Navbar from_where="home" />
					<div className="row feed-body-container">
						<div className="col-11 p-0">
							<FeedBody />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FeedPage;
