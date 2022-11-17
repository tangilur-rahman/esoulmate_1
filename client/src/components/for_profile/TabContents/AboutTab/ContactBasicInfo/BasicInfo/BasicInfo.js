// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../../ContextApi";
import PrivacyDropdown from "../ContactInfo/PrivacyDropdown/PrivacyDropdown";
import "./BasicInfo.css";

const BasicInfo = ({ getProfile }) => {
	// for updating profile-page
	const { setUpdateProfile } = GetContextApi();

	// for language input field toggle
	const [languageT, setLanguageT] = useState(false);

	// for religion input field toggle
	const [religionT, setReligionT] = useState(false);

	// for gender input field toggle
	const [genderT, setGenderT] = useState(false);

	// for DOB input field toggle
	const [birthT, setBirthT] = useState(false);

	// for getting languages input-fields value
	const [getLanguages, setLanguages] = useState(getProfile?.languages || []);

	// for getting religion input-fields value
	const [getReligion, setReligion] = useState(
		getProfile?.religion?.religion_name || ""
	);

	// for setting religion privacy
	const [getRPrivacy, setRPrivacy] = useState(
		getProfile?.religion?.privacy || "Public"
	);

	// for setting gender privacy
	const [getGPrivacy, setGPrivacy] = useState(
		getProfile?.gender_privacy || "Public"
	);

	// for setting DOB privacy
	const [getBPrivacy, setBPrivacy] = useState(
		getProfile?.date_of_birth_privacy || "Public"
	);

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState("");

	// for getting selected option
	const [getSelectOp, setSelectOp] = useState({
		name: "",
		value: ""
	});

	// initialize basic info for editing start
	useEffect(() => {
		if (getSelectOp.name === "LEdit") {
			setLanguages(getSelectOp.value.language);
		} else if (getSelectOp.name === "REdit") {
			setReligion(getSelectOp.value.religion);
			setRPrivacy(getSelectOp.value.privacy);
		} else if (getSelectOp.name === "GEdit") {
			setGPrivacy(getSelectOp.value.privacy);
		} else if (getSelectOp.name === "BEdit") {
			setBPrivacy(getSelectOp.value.privacy);
		}
	}, [getSelectOp]);
	// initialize basic info for editing end

	// for close delete popup when click outside start
	const deleteRef = useRef();

	const handleClickOutsideDel = (e) => {
		if (!deleteRef.current?.contains(e.target)) {
			setSelectOp({ name: "", value: "" });
			setLanguageT(false);
			setReligionT(false);
			setGenderT(false);
			setBirthT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDel);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideDel);
	}, []);
	// for close delete popup when click outside  start

	// for add & update language on server start
	const addLanguages = async () => {
		try {
			setIsLoading(true);

			// for getting new array
			const newArr = getLanguages
				.split(" ")
				.join(",")
				.split(",")
				.filter((value) => value && value);

			const response = await fetch(
				`/user/about/add-language?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({ languages: newArr }),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success(
					getSelectOp.name === "LEdit"
						? "Updated your language successfully."
						: "Added your language successfully.",
					{
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					}
				);

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setLanguages("");
					setLanguageT("");
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
	// for add & update language on server end

	// for add & update religion on server start
	const addReligion = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/add-religion?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({
						religion_name: getReligion,
						privacy: getRPrivacy
					}),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success(
					getSelectOp.name === "REdit"
						? "Updated your religion successfully."
						: "Added your religion successfully.",
					{
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					}
				);

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setReligion("");
					setReligionT("");
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
	// for add & update religion on server end

	// for update gender-privacy on server start
	const updateGenderPrivacy = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/update-gender-privacy?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({
						gender_privacy: getGPrivacy
					}),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Updated your gender privacy successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setGenderT("");
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
	// for  update gender-privacy on server end

	// for update dob-privacy on server start
	const updateDOBPrivacy = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/update-dob-privacy?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({
						date_of_birth_privacy: getBPrivacy
					}),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Updated your DOB privacy successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setBirthT("");
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
	// for  update dob-privacy on server end

	// for displaying dob start
	// for displaying full month-name
	const fullMonth = (value) => {
		if (value === "Jan") {
			return "January";
		} else if (value === "Feb") {
			return "February";
		} else if (value === "Mar") {
			return "March";
		} else if (value === "Apr") {
			return "April";
		} else if (value === "May") {
			return "May";
		} else if (value === "June") {
			return "June";
		} else if (value === "July") {
			return "July";
		} else if (value === "Aug") {
			return "August";
		} else if (value === "Sept") {
			return "September";
		} else if (value === "Oct") {
			return "October";
		} else if (value === "Nov") {
			return "November";
		} else if (value === "Dec") {
			return "December";
		}
	};

	const displayingDOB = (date) => {
		const dobArr = date.split("-");
		return fullMonth(dobArr[1]) + " " + dobArr[0] + ", " + dobArr[2];
	};
	// for displaying dob end

	return (
		<div className="row m-0">
			<div className="col p-0">
				<div className="basic-container">
					<h5>Basic Info</h5>

					{/* language start  */}
					{!getProfile.languages.length > 0 && (
						<div
							className="add-new"
							onClick={() => {
								setLanguageT(true);
								setLanguages("");
								setSelectOp({ name: "", value: "" });
							}}
							style={{ display: "none" }}
						>
							{languageT ? (
								<p style={{ color: "black", margin: "0" }}>Languages</p>
							) : (
								<>
									<i className="bi bi-plus-circle-dotted"></i>
									<p>Add a language</p>
								</>
							)}
						</div>
					)}

					{/* input-fields showing start  */}
					{(languageT || getSelectOp.name === "LEdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "LEdit" && (
								<p className="modify-fields">Edit Language</p>
							)}
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control outline-sty"
									id="language"
									placeholder="Language"
									onChange={(e) => setLanguages(e.target.value)}
									value={getLanguages}
								/>
								<label htmlFor="language">Language *</label>
							</div>

							<div className="submit-btn-con">
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										setLanguageT(false);
										setLanguages("");
										setSelectOp({ name: "", value: "" });
									}}
								>
									Cancel
								</button>

								{(languageT || getSelectOp.name === "LEdit") && (
									<button
										type="button"
										className="btn btn-primary"
										onClick={addLanguages}
									>
										{isLoading ? (
											<i
												className="fa-solid fa-spinner fa-spin"
												id="loading"
											></i>
										) : getSelectOp.name === "EEdit" ? (
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

					{/* displaying language start  */}
					{getProfile?.languages?.length > 0 && (
						<div
							className="displaying-contact-info"
							id="dec-space"
							style={{ display: "none" }}
						>
							<div id="left">
								<i className="fa-solid fa-language"></i>
								<div className="Edit">
									<p id="up">
										{getProfile.languages.map((value, index) => {
											return (
												<span
													key={index}
													style={{ textTransform: "capitalize" }}
												>
													{`
														${value}${getProfile.languages.length !== index + 1 ? "," : ""}`}
													&nbsp;
												</span>
											);
										})}
									</p>

									<p id="down">Languages</p>
								</div>
							</div>

							<div id="right">
								<div className="option">
									<i
										className="fa-solid fa-pen-to-square option-icon"
										onClick={() => {
											setSelectOp({
												name: "LEdit",
												value: {
													language: getProfile.languages
												}
											});
											setLanguageT(false);
										}}
									></i>
								</div>
							</div>
						</div>
					)}
					{/* displaying language end */}
					{/* language end  */}

					{/* religion start  */}
					{!getProfile?.religion?.religion_name && (
						<div
							className="add-new"
							onClick={() => {
								setLanguageT(false);
								setReligionT(true);
								setReligion("");
								setSelectOp({ name: "", value: "" });
							}}
						>
							{religionT ? (
								<p style={{ color: "black", margin: "0" }}>Religion</p>
							) : (
								<>
									<i className="bi bi-plus-circle-dotted"></i>
									<p>Add religion</p>
								</>
							)}
						</div>
					)}

					{/* input-fields showing start  */}
					{(religionT || getSelectOp.name === "REdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "REdit" && (
								<p className="modify-fields">Edit Religion</p>
							)}
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control outline-sty"
									id="religion"
									placeholder="Religion"
									onChange={(e) => setReligion(e.target.value)}
									value={getReligion}
								/>
								<label htmlFor="religion">Religion *</label>
							</div>

							<div className="submit-btn-con">
								<div className="privacy-wrapper">
									<PrivacyDropdown
										getPrivacy={getRPrivacy}
										setPrivacy={setRPrivacy}
									/>
								</div>

								<div className="btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setReligionT(false);
											setReligion("");
											setSelectOp({ name: "", value: "" });
											setRPrivacy(getProfile.religion.privacy);
										}}
									>
										Cancel
									</button>

									{(religionT || getSelectOp.name === "REdit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={addReligion}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : getSelectOp.name === "REdit" ? (
												"Update"
											) : (
												"Submit"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					)}
					{/* input-fields showing end  */}

					{/* displaying religion start  */}
					{getProfile?.religion?.religion_name && (
						<div className="displaying-contact-info">
							<div id="left">
								<img
									src="/assets/icon/Religion.png"
									alt="religion icon"
									className="img-fluid"
								/>
								<div className="Edit">
									<p id="up">{getProfile?.religion.religion_name}</p>

									<p id="down">Religion</p>
								</div>
							</div>

							<div id="right">
								<div className="privacy-icon">
									{(getRPrivacy === "Public" && (
										<i className="fa-solid fa-earth-americas"></i>
									)) ||
										(getRPrivacy === "Followers" && (
											<i className="fa-solid fa-user-group"></i>
										))}
								</div>

								<div className="option">
									<i
										className="fa-solid fa-pen-to-square option-icon"
										onClick={() => {
											setSelectOp({
												name: "REdit",
												value: {
													religion: getProfile?.religion?.religion_name,
													privacy: getProfile?.religion?.privacy
												}
											});
											setReligionT(false);
										}}
									></i>
								</div>
							</div>
						</div>
					)}
					{/* displaying religion end */}
					{/* religion end  */}

					{/* gender start  */}
					{/* input-fields showing start  */}
					{(genderT || getSelectOp.name === "GEdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "GEdit" && (
								<p className="modify-fields">Edit Gender</p>
							)}
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control outline-sty"
									id="gender"
									placeholder="Gender"
									value={getProfile.gender}
									readOnly
									style={{ textTransform: "capitalize" }}
								/>
								<label htmlFor="gender">Gender *</label>
							</div>

							<div className="submit-btn-con">
								<div className="privacy-wrapper">
									<PrivacyDropdown
										getPrivacy={getGPrivacy}
										setPrivacy={setGPrivacy}
									/>
								</div>

								<div className="btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setGenderT(false);
											setSelectOp({ name: "", value: "" });
											setGPrivacy(getProfile.gender_privacy);
										}}
									>
										Cancel
									</button>

									{(genderT || getSelectOp.name === "GEdit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={updateGenderPrivacy}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Update"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					)}
					{/* input-fields showing end  */}

					{/* displaying gender start  */}
					{getProfile?.gender && (
						<div className="displaying-contact-info">
							<div id="left">
								<img
									src="/assets/icon/Gender.png"
									alt="gender icon"
									className="img-fluid"
								/>
								<div className="Edit">
									<p id="up" style={{ textTransform: "capitalize" }}>
										{getProfile?.gender}
									</p>

									<p id="down">Gender</p>
								</div>
							</div>

							<div id="right">
								<div className="privacy-icon">
									{(getGPrivacy === "Public" && (
										<i className="fa-solid fa-earth-americas"></i>
									)) ||
										(getGPrivacy === "Followers" && (
											<i className="fa-solid fa-user-group"></i>
										))}
								</div>

								<div className="option">
									<i
										className="fa-solid fa-pen-to-square option-icon"
										onClick={() => {
											setSelectOp({
												name: "GEdit",
												value: {
													privacy: getProfile?.gender_privacy
												}
											});
											setGenderT(false);
										}}
									></i>
								</div>
							</div>
						</div>
					)}
					{/* displaying gender end */}
					{/* gender end  */}

					{/* date of birth start  */}
					{/* input-fields showing start  */}
					{(birthT || getSelectOp.name === "BEdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "BEdit" && (
								<p className="modify-fields">Edit Date Of Birth</p>
							)}
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control outline-sty"
									id="dob"
									placeholder="Date Of Birth"
									value={displayingDOB(getProfile.date_of_birth)}
									readOnly
									style={{ textTransform: "capitalize" }}
								/>
								<label htmlFor="dob">Date Of Birth *</label>
							</div>

							<div className="submit-btn-con">
								<div className="privacy-wrapper">
									<PrivacyDropdown
										getPrivacy={getBPrivacy}
										setPrivacy={setBPrivacy}
									/>
								</div>

								<div className="btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setBirthT(false);
											setSelectOp({ name: "", value: "" });
											setBPrivacy(getProfile.date_of_birth_privacy);
										}}
									>
										Cancel
									</button>

									{(birthT || getSelectOp.name === "BEdit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={updateDOBPrivacy}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : (
												"Update"
											)}
										</button>
									)}
								</div>
							</div>
						</div>
					)}
					{/* input-fields showing end  */}

					{/* displaying date of birth start  */}
					{getProfile?.date_of_birth && (
						<div className="displaying-contact-info">
							<div id="left">
								<img
									src="/assets/icon/Birthday.png"
									alt="birthday icon"
									className="img-fluid"
								/>
								<div className="Edit" id="birthday-display">
									<p id="up" style={{ textTransform: "capitalize" }}>
										{displayingDOB(getProfile?.date_of_birth)}
									</p>

									<p id="down">Date of birth</p>
								</div>
							</div>

							<div id="right">
								<div className="privacy-icon">
									{(getBPrivacy === "Public" && (
										<i className="fa-solid fa-earth-americas"></i>
									)) ||
										(getBPrivacy === "Followers" && (
											<i className="fa-solid fa-user-group"></i>
										))}
								</div>

								<div className="option">
									<i
										className="fa-solid fa-pen-to-square option-icon"
										onClick={() => {
											setSelectOp({
												name: "BEdit",
												value: {
													privacy: getProfile?.date_of_birth_privacy
												}
											});
											setBirthT(false);
										}}
									></i>
								</div>
							</div>
						</div>
					)}
					{/* displaying date of birth end */}
					{/* date of birth end  */}
				</div>
			</div>
		</div>
	);
};

export default BasicInfo;
