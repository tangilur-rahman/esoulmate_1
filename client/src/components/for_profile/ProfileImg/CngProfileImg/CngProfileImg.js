// external components
import { useEffect, useRef } from "react";

// internal components
import { GetContextApi } from "../../../../ContextApi";
import "./CngProfileImg.css";
import CreatePost from "./CreatePost/CreatePost";

const CngProfileImg = ({
	setChangeImgT,
	getPreview,
	getCoverImg,
	setCoverImg,
	getProfileImg,
	setProfileImg
}) => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// for close when clicked outside start
	const myUseRef = useRef();

	const handleClickOutside = (e) => {
		if (!myUseRef.current?.contains(e.target)) {
			setChangeImgT(false);
			setCoverImg("");
			setProfileImg("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close when clicked outside end

	// for inside clicked stop-propagation start
	const modalRef = useRef();

	useEffect(() => {
		const stopPropagation = (e) => {
			e.stopPropagation();
		};

		const { current: modalDom } = modalRef;
		modalDom.addEventListener("mousedown", stopPropagation);

		return () => {
			modalDom.removeEventListener("mousedown", stopPropagation);
		};
	}, []);
	// for inside clicked stop-propagation end

	return (
		<>
			<div
				className="c-pro-img-container"
				data-aos="fade-down"
				data-aos-delay="1000"
			>
				<div ref={modalRef} className="row m-0 c-pro-layout">
					<div
						ref={myUseRef}
						className=" col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-10 col-11 p-0 wrapper"
					>
						<CreatePost
							setChangeImgT={setChangeImgT}
							currentUser={currentUser}
							getPreview={getPreview}
							getCoverImg={getCoverImg}
							setCoverImg={setCoverImg}
							getProfileImg={getProfileImg}
							setProfileImg={setProfileImg}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CngProfileImg;
