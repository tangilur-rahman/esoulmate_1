// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./Location.css";

const Location = ({ getProfile }) => {
	// for updating profile-page
	const { setUpdateProfile } = GetContextApi();

	// for hometown input fields toggle
	const [homeT, setHomeT] = useState(false);

	// for current-city input-fields toggle
	const [currentCT, setCurrentCT] = useState(false);

	// for getting input-fields value for hometown
	const [getHCity, setHCity] = useState("");
	const [getHCountry, setHCountry] = useState("");

	// for getting input-fields value for current-town
	const [getCCity, setCCity] = useState("");
	const [getCCountry, setCCountry] = useState("");

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState("");

	// for hometown option toggle
	const [optionHT, setOptionHT] = useState("");

	// for current-city option toggle
	const [optionCT, setOptionCT] = useState("");

	// for getting selected option
	const [getSelectOp, setSelectOp] = useState({
		name: "",
		value: ""
	});

	// initialize hometown info for editing start
	useEffect(() => {
		if (getSelectOp.name === "HEdit") {
			setHCity(getSelectOp.value.city);
			setHCountry(getSelectOp.value.country);
		} else if (getSelectOp.name === "CEdit") {
			setCCity(getSelectOp.value.city);
			setCCountry(getSelectOp.value.country);
		}
	}, [getSelectOp]);
	// initialize hometown info for editing end

	// for close option when click outside start
	const optionRef = useRef();

	const handleClickOutside = (e) => {
		if (!optionRef.current?.contains(e.target)) {
			setOptionHT("");
			setOptionCT("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	// for close option when click outside  start

	// for close delete popup when click outside start
	const deleteRef = useRef();

	const handleClickOutsideDel = (e) => {
		if (!deleteRef.current?.contains(e.target)) {
			setSelectOp({ name: "", value: "" });
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDel);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideDel);
	}, []);
	// for close delete popup when click outside  start

	// for add & update hometown on server start
	const addHometown = async () => {
		try {
			setIsLoading(true);

			const hometownInfo = {
				city: getHCity,
				country: getHCountry
			};

			const response = await fetch(
				`/user/about/add-home-location?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(hometownInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success(
					getSelectOp.name === "HEdit"
						? "Updated your hometown successfully."
						: "Added your hometown successfully.",
					{
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					}
				);

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setHCity("");
					setHCountry("");
					setHomeT("");
					setSelectOp({ name: "", value: "" });
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for add & update hometown on server end

	// for delete hometown from server start
	const deleteHometown = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-home-location?id=${getProfile._id}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Deleted your hometown successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setHCity("");
					setHCountry("");
					setHomeT("");
					setSelectOp({ name: "", value: "" });
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for delete hometown from server end

	// for add & update current-city on server start
	const addCurrentCity = async () => {
		try {
			setIsLoading(true);

			const currentCityInfo = {
				city: getCCity,
				country: getCCountry
			};

			const response = await fetch(
				`/user/about/add-current-location?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(currentCityInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success(
					getSelectOp.name === "CEdit"
						? "Updated your current city successfully."
						: "Added your current city successfully.",
					{
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					}
				);

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setCCity("");
					setCCountry("");
					setCurrentCT("");
					setSelectOp({ name: "", value: "" });
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for add & update current-city on server end

	// for delete current-city from server start
	const deleteCurrentCity = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-current-location?id=${getProfile._id}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Deleted your current city successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setCCity("");
					setCCountry("");
					setCurrentCT("");
					setSelectOp({ name: "", value: "" });
					setIsLoading(false);
				}, [2000]);
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
			setIsLoading(false);
		}
	};
	// for delete current-city from server end

	return (
		<div className="row m-0">
			<div className="col p-0">
				<div className="location-container">
					<h5>Location</h5>

					{/* home-town start  */}
					{!getProfile.hometown.city && (
						<div
							className="add-new"
							onClick={() => {
								setHomeT(true);
								setCurrentCT(false);
								setHCity("");
								setHCountry("");
								setSelectOp({ name: "", value: "" });
							}}
						>
							{homeT ? (
								<p style={{ color: "black", margin: "0" }}>Hometown</p>
							) : (
								<>
									<i className="bi bi-plus-circle-dotted"></i>
									<p>Add hometown</p>
								</>
							)}
						</div>
					)}

					{/* input-fields showing start  */}
					{(homeT || getSelectOp.name === "HEdit") && (
						<div className="input-fields" ref={deleteRef}>
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="city"
									placeholder="city"
									onChange={(e) => setHCity(e.target.value)}
									value={getHCity}
								/>
								<label htmlFor="city">City *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="country"
									placeholder="country"
									onChange={(e) => setHCountry(e.target.value)}
									value={getHCountry}
								/>
								<label htmlFor="country">Country *</label>
							</div>

							<div className="submit-btn-con">
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										setHomeT(false);
										setHCity("");
										setHCountry("");
										setSelectOp({ name: "", value: "" });
									}}
								>
									Cancel
								</button>

								{(homeT || getSelectOp.name === "HEdit") && (
									<button
										type="button"
										className="btn btn-primary"
										onClick={addHometown}
										disabled={getHCity && getHCountry ? false : true}
									>
										{isLoading ? (
											<i
												className="fa-solid fa-spinner fa-spin"
												id="loading"
											></i>
										) : getSelectOp.name === "HEdit" ? (
											"Update"
										) : (
											"Submit"
										)}
									</button>
								)}
							</div>
						</div>
					)}
					{/* input-fields showing end  */}

					{/* displaying hometown start  */}
					{getProfile.hometown?.city && (
						<div className="displaying-location">
							<div id="left">
								<i className="fa-solid fa-house-chimney-window"></i>
								<div className="Edit">
									<p id="up">
										{getProfile.hometown?.city},&nbsp;
										{getProfile.hometown?.country}
									</p>

									<p id="down">Hometown</p>
								</div>
							</div>

							<div id="right">
								<div className="option">
									<i
										className="fa-solid fa-ellipsis"
										onClick={() => setOptionHT(true)}
									></i>

									{optionHT && (
										<ul ref={optionRef}>
											<li
												onClick={() => {
													setOptionHT("");
													setSelectOp({
														name: "HEdit",
														value: {
															city: getProfile.hometown.city,
															country: getProfile.hometown.country
														}
													});
													setHomeT(false);
													setCurrentCT(false);
												}}
											>
												<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
												Edit
											</li>

											<li
												onClick={() => {
													setOptionHT("");
													setSelectOp({
														name: "HDelete",
														value: ""
													});
													setHomeT(false);
												}}
											>
												<i className="fa-solid fa-trash-can option-icon"></i>{" "}
												Delete
											</li>
										</ul>
									)}
								</div>
							</div>
						</div>
					)}
					{/* displaying hometown end */}

					{/* conform popup for delete hometown start  */}
					{getSelectOp.name === "HDelete" && (
						<div className="home-del-popup">
							<div
								className="home-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Are you sure?</h5>
									<hr />
									<p>
										Are you sure you want to remove this hometown from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteHometown}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Delete"
											)}
										</button>

										<button
											type="button"
											className="btn btn-light"
											onClick={() =>
												setSelectOp({
													name: "",
													value: ""
												})
											}
										>
											Cancel
										</button>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectOp({
											name: "",
											value: ""
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* conform popup for delete hometown end */}
					{/* home-town end  */}

					{/* current-city start  */}
					{!getProfile.current_city.city && (
						<div
							className="add-new"
							onClick={() => {
								setHomeT(false);
								setCurrentCT(true);
								setCCity("");
								setCCountry("");
								setSelectOp({ name: "", value: "" });
							}}
						>
							{currentCT ? (
								<p style={{ color: "black", margin: "0" }}>Current City</p>
							) : (
								<>
									<i className="bi bi-plus-circle-dotted"></i>
									<p>Add Current City</p>
								</>
							)}
						</div>
					)}

					{/* input-fields showing start  */}
					{(currentCT || getSelectOp.name === "CEdit") && (
						<div className="input-fields" ref={deleteRef}>
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="city1"
									placeholder="city"
									onChange={(e) => setCCity(e.target.value)}
									value={getCCity}
								/>
								<label htmlFor="city1">City *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="country1"
									placeholder="country"
									onChange={(e) => setCCountry(e.target.value)}
									value={getCCountry}
								/>
								<label htmlFor="country1">Country *</label>
							</div>

							<div className="submit-btn-con">
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										setCurrentCT(false);
										setCCity("");
										setCCountry("");
										setSelectOp({ name: "", value: "" });
									}}
								>
									Cancel
								</button>

								{(currentCT || getSelectOp.name === "CEdit") && (
									<button
										type="button"
										className="btn btn-primary"
										onClick={addCurrentCity}
										disabled={getCCity && getCCountry ? false : true}
									>
										{isLoading ? (
											<i
												className="fa-solid fa-spinner fa-spin"
												id="loading"
											></i>
										) : getSelectOp.name === "CEdit" ? (
											"Update"
										) : (
											"Submit"
										)}
									</button>
								)}
							</div>
						</div>
					)}
					{/* input-fields showing end  */}

					{/* displaying current-city start  */}
					{getProfile.current_city?.city && (
						<div className="displaying-location" id="c-location">
							<div id="left">
								<i className="fa-solid fa-location-dot" id="c-icon"></i>
								<div className="Edit">
									<p id="up">
										{getProfile.current_city?.city},&nbsp;
										{getProfile.current_city?.country}
									</p>

									<p id="down">Current City</p>
								</div>
							</div>

							<div id="right">
								<div className="option">
									<i
										className="fa-solid fa-ellipsis"
										onClick={() => setOptionCT(true)}
									></i>

									{optionCT && (
										<ul ref={optionRef}>
											<li
												onClick={() => {
													setOptionCT("");
													setSelectOp({
														name: "CEdit",
														value: {
															city: getProfile.current_city.city,
															country: getProfile.current_city.country
														}
													});
													setHomeT(false);
													setCurrentCT(false);
												}}
											>
												<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
												Edit
											</li>

											<li
												onClick={() => {
													setOptionCT("");
													setSelectOp({
														name: "CDelete",
														value: ""
													});
													setCurrentCT(false);
												}}
											>
												<i className="fa-solid fa-trash-can option-icon"></i>{" "}
												Delete
											</li>
										</ul>
									)}
								</div>
							</div>
						</div>
					)}
					{/* displaying current-city end */}

					{/* conform popup for delete current-city start  */}
					{getSelectOp.name === "CDelete" && (
						<div className="home-del-popup">
							<div
								className="home-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Are you sure?</h5>
									<hr />
									<p>
										Are you sure you want to remove this current city from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteCurrentCity}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Delete"
											)}
										</button>

										<button
											type="button"
											className="btn btn-light"
											onClick={() =>
												setSelectOp({
													name: "",
													value: ""
												})
											}
										>
											Cancel
										</button>
									</div>
								</div>

								<div
									className="close-btn-del-popup"
									onClick={() =>
										setSelectOp({
											name: "",
											value: ""
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* conform popup for delete current-city end */}
					{/* current-city end  */}
				</div>
			</div>
		</div>
	);
};

export default Location;
