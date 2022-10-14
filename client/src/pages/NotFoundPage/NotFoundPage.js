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
					<div className="row m-0" id="error-row-container">
						<div className="col p-0" id="error-col-container">
							<div id="error-link">
								<NavLink to="/" id="error-navlink" className="hover-link">
									<span>Go Back To Home</span>
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default NotFoundPage;
