import "./Description.css";
import ReadMoreReact from "read-more-react";

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
