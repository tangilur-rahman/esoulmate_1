// external components

// internal components
import "./Image.css";

const Image = ({ image }) => {
	return (
		<>
			<div className="img-container">
				<img
					src={`/uploads/attachments/${image}`}
					alt="post-img"
					className="img-fluid for-image"
				/>
			</div>
		</>
	);
};

export default Image;
