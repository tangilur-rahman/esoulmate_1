// external components
import { useEffect, useRef, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./Featured.css";

const Featured = ({ feaPopT, setFeaPopT, getProfile }) => {
	// for getting currentUser
	const { currentUser, setUpdateProfile } = GetContextApi();

	// for selected img for deleted
	const [selectedImg, setSelectedImg] = useState("");

	// for getting file
	const [getFile, setFile] = useState("");
	const [getPreview, setPreview] = useState("");

	// for loading until featured was uploaded
	const [isLoading, setIsLoading] = useState("");

	// for close outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setFeaPopT(false);
			setSelectedImg("");
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

	// for new feature upload handler start
	const featureUploadHandler = async () => {
		if (getFile) {
			setIsLoading(true);
			try {
				const formData = new FormData();
				formData.append("file", getFile);

				const response = await fetch("/user/feature/upload", {
					method: "POST",
					body: formData
				});

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 1500
					});

					setFile("");
					setPreview("");
					setSelectedImg("");
					setIsLoading(false);
					setUpdateProfile(Date.now());
				} else if (result.error) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 3000
					});
					setIsLoading(false);
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setIsLoading(false);

				setTimeout(() => {
					setFile("");
					setPreview("");
					setSelectedImg("");
					setFeaPopT(false);
				}, 3000);
			}
		}
	};
	//for new feature upload handler end

	// feature specific Delete handler start
	const featureDeleteHandler = async () => {
		if (selectedImg) {
			setIsLoading(true);
			try {
				const response = await fetch(
					`/user/feature/delete/${selectedImg.id}?img=${selectedImg.img}`
				);

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 1500
					});

					setFile("");
					setPreview("");
					setSelectedImg("");
					setIsLoading(false);
					setUpdateProfile(Date.now());
				} else if (result.error) {
					toast(result.error, {
						position: "top-right",
						theme: "dark",
						autoClose: 3000
					});
					setIsLoading(false);
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setIsLoading(false);

				setTimeout(() => {
					setFile("");
					setPreview("");
					setSelectedImg("");
					setFeaPopT(false);
				}, 3000);
			}
		}
	};
	// feature specific delete handler end

	return (
		<>
			<div className="featured-container">
				<h5>Featured</h5>

				{getProfile?.featured?.length > 0 && (
					<PhotoProvider>
						{getProfile.featured
							.map((item, item_key) => {
								return (
									<PhotoView
										src={`/uploads/profile-img/${item.img}`}
										key={item_key}
									>
										{item_key === getProfile.featured.length - 1 ? (
											<img
												src={`/uploads/profile-img/${item.img}`}
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
				)}

				{feaPopT && (
					<div className="featured-popup">
						<div
							className="featured-popup-wrapper"
							data-aos="fade-down"
							ref={myRef}
						>
							<div className="header">
								{getProfile?.featured?.length > 0 ? (
									<h5>
										Edit{" "}
										{getProfile?.featured?.length > 1 ? "Features" : "Feature"}
									</h5>
								) : (
									<h5>Add Your Feature</h5>
								)}

								<div className="close-btn" onClick={() => setFeaPopT(false)}>
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>

							{getProfile?.featured?.length > 0 && (
								<PhotoProvider>
									<div className="feature-img-wrapper">
										{getProfile.featured
											.map((item, item_key) => {
												return (
													<PhotoView
														src={`/uploads/profile-img/${item.img}`}
														key={item_key}
													>
														<span>
															<img
																src={`/uploads/profile-img/${item.img}`}
																alt="feature-img"
															/>
															<div
																id="delete-icon"
																onClick={(e) => {
																	e.stopPropagation();
																	setSelectedImg({
																		img: item.img,
																		id: item._id
																	});
																}}
															>
																<i className="fa-solid fa-trash-can"></i>
															</div>
														</span>
													</PhotoView>
												);
											})
											.reverse()}
									</div>
								</PhotoProvider>
							)}

							<button type="button" className="add-new btn">
								<label htmlFor="add-new">
									<span style={{ cursor: "pointer" }}>Add New</span>
								</label>
							</button>
						</div>

						{/* for popup model section start  */}
						{(selectedImg || getPreview) && (
							<div
								className="conformation-popup"
								id={getPreview ? "when-upload" : "when-delete"}
								data-aos="fade-down"
								data-aos-delay="0"
								ref={myRef}
							>
								<img
									src={
										getPreview
											? getPreview
											: `/uploads/profile-img/${selectedImg?.img}`
									}
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
											<span
												className="hover-link"
												style={{ display: "inline-block" }}
											>
												Cancel
											</span>
										</button>

										{getPreview ? (
											<button
												className="btn btn-primary"
												onClick={featureUploadHandler}
											>
												{isLoading ? (
													<i className="fa-solid fa-spinner fa-spin"></i>
												) : (
													<span
														className="hover-link"
														style={{ display: "inline-block" }}
													>
														Upload
													</span>
												)}
											</button>
										) : (
											<button
												className="btn btn-danger"
												onClick={featureDeleteHandler}
											>
												{isLoading ? (
													<i className="fa-solid fa-spinner fa-spin"></i>
												) : (
													<span
														className="hover-link"
														style={{ display: "inline-block" }}
													>
														Delete
													</span>
												)}
											</button>
										)}
									</div>
								</div>
							</div>
						)}
						{/* for popup model section end  */}
					</div>
				)}

				{currentUser?._id === getProfile?._id ? (
					<div className="featured-btn">
						<button type="button" onClick={() => setFeaPopT(!feaPopT)}>
							{getProfile?.featured?.length > 0 ? (
								<span className="hover-link">Edit your featured</span>
							) : (
								<span className="hover-link">Add your featured</span>
							)}
						</button>
					</div>
				) : getProfile?.featured?.length > 0 ? (
					""
				) : (
					<span id="empty-f-message">Empty</span>
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
