// external components
import { useEffect, useRef } from "react";

// internal components
import "./ReactionEmoji.css";

const ReactionEmoji = ({ reactT, setReactT, setReact }) => {
	// detect outside click for reaction section close start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setReactT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// detect outside click for reaction section close end

	return (
		<>
			<div
				className="react-emoji-container"
				ref={myRef}
				id={reactT ? "active" : "inactive"}
			>
				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("like");
					}}
				>
					<span className="emoji-wrapper">
						<img src="/assets/emojis/like.gif" alt="like" />

						<h6 className="title-popup" id="thumbs-up-popup">
							Thumbs Up
						</h6>
					</span>
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("love");
					}}
				>
					<span className="emoji-wrapper">
						<img src="/assets/emojis/love.gif" alt="love" />
						<h6 className="title-popup" id="love-popup">
							Love
						</h6>
					</span>
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("wow");
					}}
				>
					<span className="emoji-wrapper">
						<img src="/assets/emojis/wow.gif" alt="wow" />
						<h6 className="title-popup" id="wow-popup">
							WoW
						</h6>
					</span>
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("haha");
					}}
				>
					<span className="emoji-wrapper">
						<img src="/assets/emojis/haha.gif" alt="haha" />
						<h6 className="title-popup" id="haha-popup">
							Funny
						</h6>
					</span>
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("clap");
					}}
				>
					<span className="emoji-wrapper">
						<img src="/assets/emojis/clap.gif" alt="clap" />
						<h6 className="title-popup" id="cheer-popup">
							Cheer
						</h6>
					</span>
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("appreciate");
					}}
				>
					<span className="emoji-wrapper">
						<img src="/assets/emojis/appreciate.gif" alt="appreciate" />
						<h6 className="title-popup" id="appreciate-popup">
							Appreciate
						</h6>
					</span>
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("dislike");
					}}
				>
					<span className="emoji-wrapper">
						<img src="/assets/emojis/dislike.gif" alt="dislike" />
						<h6 className="title-popup" id="thumbs-down-popup">
							Thumbs Down
						</h6>
					</span>
				</div>
			</div>
		</>
	);
};

export default ReactionEmoji;
