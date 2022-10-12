// external components

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./Interested.css";

const Interested = ({ getProfile }) => {
	// for getting currentUser
	const { currentUser } = GetContextApi();

	return (
		<>
			<div className="interested-container">
				<h5>Interested In</h5>

				<div className="interested-items"></div>

				{currentUser?._id === getProfile?._id ? (
					<div className="interested-btn">
						<button type="button">
							{getProfile?.interested?.length > 0 ? (
								<span className="hover-link">Edit your interest</span>
							) : (
								<span className="hover-link">Add your interest</span>
							)}
						</button>
					</div>
				) : getProfile?.interested?.length > 0 ? (
					""
				) : (
					<span id="empty-interested-message">Empty</span>
				)}
			</div>
		</>
	);
};

export default Interested;
