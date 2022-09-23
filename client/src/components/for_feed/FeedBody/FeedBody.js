//own components
import FeedLeft from "./FeedLeft/FeedLeft";
import FeedMiddle from "./FeedMiddle/FeedMiddle";
import FeedRight from "./FeedRight/FeedRight";

const FeedBody = () => {
	return (
		<>
			<div className="row feed-body-container">
				<FeedLeft />
				<FeedMiddle />
				<FeedRight />
			</div>
		</>
	);
};

export default FeedBody;
