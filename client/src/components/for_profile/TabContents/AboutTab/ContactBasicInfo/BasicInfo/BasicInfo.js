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
								// setPhoneT(false);
								setLanguages("");
								setSelectOp({ name: "", value: "" });
							}}
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
						<div className="displaying-contact-info">
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
								<i className="fa-solid fa-hands-praying"></i>
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
										(getRPrivacy === "Friends" && (
											<i className="fa-solid fa-user-group"></i>
										)) ||
										(getRPrivacy === "Only Me" && (
											<i className="fa-solid fa-lock"></i>
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
											religionT(false);
										}}
									></i>
								</div>
							</div>
						</div>
					)}
					{/* displaying religion end */}
					{/* religion end  */}
				</div>
			</div>
		</div>
	);
};

export default BasicInfo;
