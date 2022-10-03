// external components

// internal components
import "./Image.css";

const Image = ({ image, header }) => {
	return (
		<>
			<div className="img-container">
				<img
					src={
						header
							? `/uploads/profile-img/${image}`
							: `/uploads/attachments/${image}`
					}
					alt="post-img"
					className="img-fluid for-image"
					id={
						header
							? header === "updated his profile picture."
								? "when-profile"
								: "when-cover"
							: "when-others"
					}
				/>
			</div>
		</>
	);
};

export default Image;
