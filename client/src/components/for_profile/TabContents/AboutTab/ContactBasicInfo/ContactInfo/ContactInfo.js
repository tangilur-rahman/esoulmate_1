// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../../ContextApi";
import "./ContactInfo.css";
import PrivacyDropdown from "./PrivacyDropdown/PrivacyDropdown";

const ContactInfo = ({ getProfile }) => {
	// for updating profile-page
	const { setUpdateProfile } = GetContextApi();

	// for email input field toggle
	const [emailT, setEmailT] = useState(false);

	// for phone input-field toggle
	const [phoneT, setPhoneT] = useState(false);

	// for getting input-fields value
	const [getEmail, setEmail] = useState("");
	const [getPhone, setPhone] = useState("");

	// for getting privacy
	const [getEPrivacy, setEPrivacy] = useState(
		getProfile?.email_privacy || "Public"
	);
	const [getPPrivacy, setPPrivacy] = useState(
		getProfile?.phone_privacy || "Public"
	);

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState("");

	// for email option toggle
	const [optionET, setOptionET] = useState("");

	// for phone option toggle
	const [optionPT, setOptionPT] = useState("");

	// for getting selected option
	const [getSelectOp, setSelectOp] = useState({
		name: "",
		value: ""
	});

	// initialize hometown info for editing start
	useEffect(() => {
		if (getSelectOp.name === "EEdit") {
			setEmail(getSelectOp.value.email);
			setEPrivacy(getSelectOp.value.privacy);
		} else if (getSelectOp.name === "PEdit") {
			setPhone(getSelectOp.value.phone);
			setPPrivacy(getSelectOp.value.privacy);
		}
	}, [getSelectOp]);
	// initialize hometown info for editing end

	// for close option when click outside start
	const optionRef = useRef();

	const handleClickOutside = (e) => {
		if (!optionRef.current?.contains(e.target)) {
			setOptionET("");
			setOptionPT("");
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
			setEmailT(false);
			setPhoneT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDel);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideDel);
	}, []);
	// for close delete popup when click outside  start

	// for add & update email on server start
	const addEmail = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/add-email?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({ email: getEmail, email_privacy: getEPrivacy }),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success(
					getSelectOp.name === "EEdit"
						? "Updated your email address successfully."
						: "Added your email address successfully.",
					{
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					}
				);

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setEmail("");
					setEmailT("");
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
	// for add & update email on server end

	// for delete email from server start
	const deleteEmail = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-email?id=${getProfile._id}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Deleted your email address successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setEmail("");
					setEmailT("");
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
	// for delete email from server end

	// for add & update phone-number on server start
	const addPhone = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/add-phone?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({ phone: getPhone, phone_privacy: getPPrivacy }),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success(
					getSelectOp.name === "PEdit"
						? "Updated your contact number successfully."
						: "Added your contact number successfully.",
					{
						position: "top-right",
						theme: "colored",
						autoClose: 2000
					}
				);

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setPhone("");
					setPhoneT("");
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
	// for add & update phone-number on server end

	// for delete phone-number from server start
	const deletePhone = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-phone?id=${getProfile._id}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Deleted your contact number successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setPhone("");
					setPhoneT("");
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
	// for delete phone from server end

	return (
		<div className="row m-0">
			<div className="col p-0">
				<div className="contact-container">
					<h5>Contact Info</h5>

					{/* home-town start  */}
					{!getProfile.email && (
						<div
							className="add-new"
							onClick={() => {
								setEmailT(true);
								setPhoneT(false);
								setEmail("");
								setEPrivacy("Public");
								setSelectOp({ name: "", value: "" });
							}}
						>
							{emailT ? (
								<p style={{ color: "black", margin: "0" }}>Email</p>
							) : (
								<>
									<i className="bi bi-plus-circle-dotted"></i>
									<p>Add Email</p>
								</>
							)}
						</div>
					)}

					{/* input-fields showing start  */}
					{(emailT || getSelectOp.name === "EEdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "EEdit" && (
								<p className="modify-fields">Edit Email</p>
							)}
							<div className="form-floating mb-3">
								<input
									type="email"
									className="form-control outline-sty"
									id="email"
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
									value={getEmail}
								/>
								<label htmlFor="email">Email *</label>
							</div>

							<div className="submit-btn-con">
								<div className="privacy-wrapper">
									<PrivacyDropdown
										getPrivacy={getEPrivacy}
										setPrivacy={setEPrivacy}
									/>
								</div>
								<div className="btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setEmailT(false);
											setEmail("");
											setSelectOp({ name: "", value: "" });
											setEPrivacy(getProfile.email_privacy);
										}}
									>
										Cancel
									</button>

									{(emailT || getSelectOp.name === "EEdit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={addEmail}
											disabled={
												getEmail &&
												getEmail.includes("@") &&
												getEmail.includes(".")
													? false
													: true
											}
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
						</div>
					)}
					{/* input-fields showing end  */}

					{/* displaying email start  */}
					{getProfile?.email && (
						<div className="displaying-contact-info">
							<div id="left">
								<i className="fa-solid fa-at"></i>
								<div className="Edit">
									<p id="up">{getProfile.email}</p>

									<p id="down">Email</p>
								</div>
							</div>

							<div id="right">
								<div className="privacy-icon">
									{(getEPrivacy === "Public" && (
										<i className="fa-solid fa-earth-americas"></i>
									)) ||
										(getEPrivacy === "Friends" && (
											<i className="fa-solid fa-user-group"></i>
										)) ||
										(getEPrivacy === "Only Me" && (
											<i className="fa-solid fa-lock"></i>
										))}
								</div>

								<div className="option">
									<i
										className="fa-solid fa-ellipsis"
										onClick={() => setOptionET(true)}
									></i>

									{optionET && (
										<ul ref={optionRef}>
											<li
												onClick={() => {
													setOptionET("");
													setSelectOp({
														name: "EEdit",
														value: {
															email: getProfile.email,
															privacy: getProfile.email_privacy
														}
													});
													setEmailT(false);
													setPhoneT(false);
												}}
											>
												<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
												Edit
											</li>

											<li
												onClick={() => {
													setOptionET("");
													setSelectOp({
														name: "EDelete",
														value: ""
													});
													setEmailT(false);
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
					{/* displaying email end */}

					{/* conform popup for delete email start  */}
					{getSelectOp.name === "EDelete" && (
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
										Are you sure you want to remove this email from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteEmail}
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
					{/* conform popup for delete email end */}
					{/* email end  */}

					{/* phone start  */}
					{!getProfile.phone && (
						<div
							className="add-new"
							onClick={() => {
								setEmailT(false);
								setPhoneT(true);
								setPhone("");
								setPPrivacy("Public");
								setSelectOp({ name: "", value: "" });
							}}
						>
							{phoneT ? (
								<p style={{ color: "black", margin: "0" }}>Contact Number</p>
							) : (
								<>
									<i className="bi bi-plus-circle-dotted"></i>
									<p>Add Contact Number</p>
								</>
							)}
						</div>
					)}

					{/* input-fields showing start  */}
					{(phoneT || getSelectOp.name === "PEdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "PEdit" && (
								<p className="modify-fields">Edit Contact Number</p>
							)}
							<div className="form-floating mb-3">
								<input
									type="number"
									className="form-control outline-sty"
									id="phone"
									placeholder="Contact Number"
									onChange={(e) => setPhone(e.target.value)}
									value={getPhone}
								/>
								<label htmlFor="phone">Contact Number *</label>
							</div>

							<div className="submit-btn-con">
								<div className="privacy-wrapper">
									<PrivacyDropdown
										getPrivacy={getPPrivacy}
										setPrivacy={setPPrivacy}
									/>
								</div>

								<div className="btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setPhoneT(false);
											setPhone("");
											setSelectOp({ name: "", value: "" });
											setPPrivacy(getProfile.phone_privacy);
										}}
									>
										Cancel
									</button>

									{(phoneT || getSelectOp.name === "PEdit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={addPhone}
											disabled={getPhone ? false : true}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : getSelectOp.name === "PEdit" ? (
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

					{/* displaying phone start  */}
					{getProfile.phone && (
						<div className="displaying-contact-info" id="c-location">
							<div id="left">
								<i className="fa-solid fa-phone" id="c-icon"></i>
								<div className="Edit">
									<p id="up">{getProfile.phone}</p>

									<p id="down">Contact Number</p>
								</div>
							</div>

							<div id="right">
								<div className="privacy-icon">
									{(getPPrivacy === "Public" && (
										<i className="fa-solid fa-earth-americas"></i>
									)) ||
										(getPPrivacy === "Friends" && (
											<i className="fa-solid fa-user-group"></i>
										)) ||
										(getPPrivacy === "Only Me" && (
											<i className="fa-solid fa-lock"></i>
										))}
								</div>

								<div className="option">
									<i
										className="fa-solid fa-ellipsis"
										onClick={() => setOptionPT(true)}
									></i>

									{optionPT && (
										<ul ref={optionRef}>
											<li
												onClick={() => {
													setOptionPT("");
													setSelectOp({
														name: "PEdit",
														value: {
															phone: getProfile.phone,
															privacy: getProfile.phone_privacy
														}
													});
													setEmailT(false);
													setPhoneT(false);
												}}
											>
												<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
												Edit
											</li>

											<li
												onClick={() => {
													setOptionPT("");
													setSelectOp({
														name: "PDelete",
														value: ""
													});
													setPhoneT(false);
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
					{/* displaying phone end */}

					{/* conform popup for delete phone start  */}
					{getSelectOp.name === "PDelete" && (
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
										Are you sure you want to remove this contact number from
										your profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deletePhone}
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
					{/* conform popup for delete phone end */}
					{/* phone end  */}
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
