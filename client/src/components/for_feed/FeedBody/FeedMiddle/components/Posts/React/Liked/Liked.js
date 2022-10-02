// external components

// internal component
import "./Liked.css";

const Liked = ({ reaction }) => {
	// for creating group by base on react start
	const groupBy = (arr, property) => {
		return arr.reduce((acc, cur) => {
			acc[cur[property]] = [...(acc[cur[property]] || []), cur];
			return acc;
		}, {});
	};

	const getGroupBy = groupBy(reaction, "react");
	// for creating group by base on react end

	// for sorting & getting first maximum-3 start
	const likeLen = getGroupBy.like ? getGroupBy.like.length : 0;
	const loveLen = getGroupBy.love ? getGroupBy.love.length : 0;
	const wowLen = getGroupBy.wow ? getGroupBy.wow.length : 0;
	const hahaLen = getGroupBy.haha ? getGroupBy.haha.length : 0;
	const clapLen = getGroupBy.clap ? getGroupBy.clap.length : 0;
	const appreciateLen = getGroupBy.appreciate
		? getGroupBy.appreciate.length
		: 0;
	const dislikeLen = getGroupBy.dislike ? getGroupBy.dislike.length : 0;

	const getMaximum = [
		{ react: "like", len: likeLen },
		{ react: "love", len: loveLen },
		{ react: "wow", len: wowLen },
		{ react: "haha", len: hahaLen },
		{ react: "clap", len: clapLen },
		{ react: "appreciate", len: appreciateLen },
		{ react: "dislike", len: dislikeLen }
	]
		.sort((a, b) => a.len - b.len)
		.reverse();
	// for sorting & getting first maximum-3 end

	return (
		<>
			{/* liked section start  */}
			<div className="liked-container">
				<div className="liked-by">
					{getMaximum[0]?.len > 0 && (
						<span>
							<img
								src={`/assets/emojis/${getMaximum[0].react}.png`}
								className="img-fluid"
								alt="profile-img"
							/>
						</span>
					)}

					{getMaximum[1]?.len > 0 && (
						<span>
							<img
								src={`/assets/emojis/${getMaximum[1].react}.png`}
								className="img-fluid"
								alt="profile-img"
							/>
						</span>
					)}

					{getMaximum[2]?.len > 0 && (
						<span>
							<img
								src={`/assets/emojis/${getMaximum[2].react}.png`}
								className="img-fluid"
								alt="profile-img"
							/>
						</span>
					)}

					<p>
						Reacted by
						<p className="hover-link" id="second-para">
							<b>{reaction[reaction.length - 1].user_id.name}</b>
							{reaction.length > 1 && (
								<p>
									and &nbsp;
									<b>{reaction.length - 1} others</b>
								</p>
							)}
						</p>
					</p>
				</div>
			</div>
			{/* liked section end  */}
		</>
	);
};

export default Liked;
