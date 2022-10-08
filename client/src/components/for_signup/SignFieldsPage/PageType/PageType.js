// external components
import { useEffect, useRef, useState } from "react";

// internal components
import "./PageType.css";

const PageType = ({ getPType, setPType }) => {
	// for drop-down toggle
	const [typeDrop, setTypeDrop] = useState("");

	// for close dropdown when outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setTypeDrop(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	// for close dropdown when outside clicked end

	return (
		<>
			<div
				className={typeDrop ? "type-container active" : "type-container"}
				onClick={() => setTypeDrop(!typeDrop)}
				ref={myRef}
			>
				<input
					type="text"
					placeholder="Select Page Type"
					readOnly
					value={getPType}
				/>
				<div className="option" ref={myRef}>
					<div onClick={() => setPType("animator")}>
						<span>Animator</span>
					</div>

					<div onClick={() => setPType("architect")}>
						<span>Architect</span>
					</div>

					<div onClick={() => setPType("artist")}>
						<span>Artist</span>
					</div>

					<div onClick={() => setPType("baker")}>
						<span>Baker</span>
					</div>

					<div onClick={() => setPType("colorist")}>
						<span>Colorist</span>
					</div>

					<div onClick={() => setPType("comedian")}>
						<span>Comedian</span>
					</div>

					<div onClick={() => setPType("content writer")}>
						<span>Content Writer</span>
					</div>

					<div onClick={() => setPType("cook")}>
						<span>Cook</span>
					</div>

					<div onClick={() => setPType("curator")}>
						<span>Curator</span>
					</div>

					<div onClick={() => setPType("dancer")}>
						<span>Dancer</span>
					</div>

					<div onClick={() => setPType("designer")}>
						<span>Designer</span>
					</div>

					<div onClick={() => setPType("digital artist")}>
						<span>Digital Artist</span>
					</div>

					<div onClick={() => setPType("essayist")}>
						<span>Essayist</span>
					</div>

					<div onClick={() => setPType("event planner")}>
						<span>Event Planner</span>
					</div>

					<div onClick={() => setPType("fashion designer")}>
						<span>Fashion Designer</span>
					</div>

					<div onClick={() => setPType("fine artist")}>
						<span>Fine Artist</span>
					</div>

					<div onClick={() => setPType("floral designer")}>
						<span>Floral Designer</span>
					</div>

					<div onClick={() => setPType("graphic designer")}>
						<span>Graphic Designer</span>
					</div>

					<div onClick={() => setPType("hairstylist")}>
						<span>Hairstylist</span>
					</div>

					<div onClick={() => setPType("illustrator")}>
						<span>Illustrator</span>
					</div>

					<div onClick={() => setPType("interior designer")}>
						<span>Interior Designer</span>
					</div>

					<div onClick={() => setPType("jewelry designer")}>
						<span>Jewelry Designer</span>
					</div>

					<div onClick={() => setPType("lyricist")}>
						<span>Lyricist</span>
					</div>

					<div onClick={() => setPType("make-up artist")}>
						<span>Make-up Artist</span>
					</div>

					<div onClick={() => setPType("marine designer")}>
						<span>Marine Designer</span>
					</div>

					<div onClick={() => setPType("media designer")}>
						<span>Media Designer</span>
					</div>

					<div onClick={() => setPType("musician")}>
						<span>Musician</span>
					</div>

					<div onClick={() => setPType("painter")}>
						<span>Painter</span>
					</div>

					<div onClick={() => setPType("penciler")}>
						<span>Penciler</span>
					</div>

					<div onClick={() => setPType("photographer")}>
						<span>Photographer</span>
					</div>

					<div onClick={() => setPType("photojournalist")}>
						<span>Photojournalist</span>
					</div>

					<div onClick={() => setPType("potter")}>
						<span>Potter</span>
					</div>

					<div onClick={() => setPType("singer")}>
						<span>Singer</span>
					</div>

					<div onClick={() => setPType("web designer")}>
						<span>Web Designer</span>
					</div>

					<div onClick={() => setPType("wedding planner")}>
						<span>Wedding Planner</span>
					</div>

					<div onClick={() => setPType("writer")}>
						<span>Writer</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageType;
