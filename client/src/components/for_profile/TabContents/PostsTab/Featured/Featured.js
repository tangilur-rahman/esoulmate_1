// external components
import { useEffect, useRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import profileImg from "./../../../../../dummy-data/profile-images.json";
import "./Featured.css";

const Featured = ({ feaPopT, setFeaPopT, profile_id }) => {
	// for getting currentUser
	const { currentUser } = GetContextApi();

	// for close outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setFeaPopT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close outside clicked end

	return (
		<>
			<div className="featured-container">
				<h5>Featured</h5>

				<PhotoProvider>
					{profileImg.length > 0 &&
						profileImg
							.map((item, item_key) => {
								return (
									<PhotoView src={`/assets/dummy/${item.img}`} key={item_key}>
										{item_key === profileImg.length - 1 ? (
											<img
												src={`/assets/dummy/${item.img}`}
												alt="feature-img"
											/>
										) : (
											""
										)}
									</PhotoView>
								);
							})
							.reverse()}
				</PhotoProvider>

				{feaPopT && (
					<div className="featured-popup">
						<div
							className="featured-popup-wrapper"
							data-aos="fade-down"
							ref={myRef}
						>
							<div className="header">
								<h5>Edit Features</h5>
								<div className="close-btn" onClick={() => setFeaPopT(false)}>
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>

							<PhotoProvider>
								<div className="feature-img-wrapper">
									{profileImg.length > 0 &&
										profileImg.map((item, item_key) => {
											return (
												<PhotoView
													src={`/assets/dummy/${item.img}`}
													key={item_key}
												>
													<span>
														<img
															src={`/assets/dummy/${item.img}`}
															alt="feature-img"
														/>
														<div id="delete-icon">
															<i className="fa-solid fa-trash-can"></i>
														</div>
													</span>
												</PhotoView>
											);
										})}
								</div>
							</PhotoProvider>

							<button type="button" className="add-new btn">
								<span>Add New</span>
							</button>
						</div>
					</div>
				)}

				{currentUser._id === profile_id && (
					<div className="featured-btn">
						<button type="button" onClick={() => setFeaPopT(!feaPopT)}>
							{profileImg.length > 0 ? (
								<span className="hover-link">Edit your featured</span>
							) : (
								<span className="hover-link">Add your featured</span>
							)}
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Featured;
