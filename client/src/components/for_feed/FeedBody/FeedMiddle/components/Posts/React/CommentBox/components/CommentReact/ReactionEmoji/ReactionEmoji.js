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
				className="com-react-emoji-container"
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
					<img src="/assets/emojis/like.gif" alt="like" />
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("love");
					}}
				>
					<img src="/assets/emojis/love.gif" alt="love" />
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("wow");
					}}
				>
					<img src="/assets/emojis/wow.gif" alt="wow" />
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("haha");
					}}
				>
					<img src="/assets/emojis/haha.gif" alt="haha" />
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("clap");
					}}
				>
					<img src="/assets/emojis/clap.gif" alt="clap" />
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("appreciate");
					}}
				>
					<img src="/assets/emojis/appreciate.gif" alt="appreciate" />
				</div>

				<div
					className="emoji"
					onClick={() => {
						setReactT(false);
						setReact("dislike");
					}}
				>
					<img src="/assets/emojis/dislike.gif" alt="dislike" />
				</div>
			</div>
		</>
	);
};

export default ReactionEmoji;
