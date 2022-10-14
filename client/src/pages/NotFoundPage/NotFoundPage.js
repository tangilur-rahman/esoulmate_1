// external components
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// internal components
import PreloaderWithoutAOS from "../../components/Preloader/PreloaderWithoutAOS";
import "./NotFoundPage.css";

const NotFoundPage = () => {
	// for waiting for preloader displaying start
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 600);
	}, []);
	// for waiting for preloader displaying end

	return (
		<>
			{isLoading ? (
				<PreloaderWithoutAOS />
			) : (
				<div className="container-fluid p-0">
					<div className="row m-0 not-found-page">
						<div className="col p-0" id="not-found-wrapper">
							<h4>Not Found Page.</h4>

							<img src="/assets/images/not-found-img.gif" alt="not-found-gif" />
							<h4>
								<NavLink to="/" id="error-navlink">
									<span className="hover-link">Go Back To Home Page</span>
								</NavLink>
							</h4>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default NotFoundPage;
