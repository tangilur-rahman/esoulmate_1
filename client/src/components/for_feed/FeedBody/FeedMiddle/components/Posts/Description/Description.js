// external components
import ReadMoreReact from "read-more-react";

// internal components
import "./Description.css";

const Description = ({ description }) => {
	return (
		<>
			{/* description section start  */}
			<div className="description-container">
				<ReadMoreReact text={description} readMoreText={"see more..."} />
			</div>
			{/* description section end  */}
		</>
	);
};

export default Description;
