// external components
import { useEffect, useRef, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import profileImg from "./../../../../../dummy-data/profile-images.json";
import "./Featured.css";

const Featured = ({ feaPopT, setFeaPopT, getProfile }) => {
	// for getting currentUser
	const { currentUser } = GetContextApi();

	// for conforming to delete or not
	const [conformPopup, setConformPopup] = useState(false);

	// for selected img for deleted
	const [selectedImg, setSelectedImg] = useState("");

	// for getting file
	const [getFile, setFile] = useState("");
	const [getPreview, setPreview] = useState("");

	// for close outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setFeaPopT(false);
			setConformPopup(false);
			setFile("");
			setPreview("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close outside clicked end

	// for preview
	const imgHandler = (event) => {
		setFile(event.target.files[0]);
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setPreview(reader.result);
			}
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	// feature upload handler start
	const featureUploadHandler = async () => {};
	// feature upload handler end

	// feature specific Delete handler start
	const featureDeleteHandler = async () => {};
	// feature specific delete handler end

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
														<div
															id="delete-icon"
															onClick={(e) => {
																e.stopPropagation();
																setConformPopup(true);
																setSelectedImg(item.img);
															}}
														>
															<i className="fa-solid fa-trash-can"></i>
														</div>
													</span>
												</PhotoView>
											);
										})}
								</div>
							</PhotoProvider>

							<button type="button" className="add-new btn">
								<label htmlFor="add-new">
									<span>Add New</span>
								</label>
							</button>
						</div>

						{/* for popup model section start  */}
						{(conformPopup || getPreview) && (
							<div
								className="conformation-popup"
								id={getPreview ? "when-upload" : "when-delete"}
								data-aos="fade-down"
								data-aos-delay="0"
								ref={myRef}
							>
								<img
									src={getPreview ? getPreview : `/assets/dummy/${selectedImg}`}
									alt="preview-deleted img"
								/>

								<div className="permission">
									{getPreview ? (
										<h5>Do you want to add that feature?</h5>
									) : (
										<h5>Do you want to delete that feature?</h5>
									)}

									<div className="delete-controller">
										<button
											className="btn btn-dark"
											onClick={() => {
												setFeaPopT(false);
												setFile("");
												setPreview("");
											}}
										>
											Cancel
										</button>

										{getPreview ? (
											<button
												className="btn btn-primary"
												onClick={featureUploadHandler}
											>
												Upload
											</button>
										) : (
											<button
												className="btn btn-danger"
												onClick={featureDeleteHandler}
											>
												Delete
											</button>
										)}
									</div>
								</div>
							</div>
						)}
						{/* for popup model section end  */}
					</div>
				)}

				{currentUser._id === getProfile._id && (
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

				<input
					type="file"
					accept="image/*"
					id="add-new"
					style={{ display: "none" }}
					onChange={imgHandler}
				/>
			</div>
		</>
	);
};

export default Featured;
