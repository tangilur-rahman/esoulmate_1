import { NavLink } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
	return (
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
	);
};

export default NotFoundPage;
