// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./AboutYou.css";

const AboutYou = ({ getProfile }) => {
	// for updating profile-page
	const { setUpdateProfile } = GetContextApi();

	// for quotation input fields toggle
	const [quoteT, setQuoteT] = useState(false);

	// for getting input-fields value for quotation
	const [getQuote, setQuote] = useState("");

	// for quote option toggle
	const [optionQT, setOptionQT] = useState("");

	// for close option when click outside start
	const optionRef = useRef();

	const handleClickOutside = (e) => {
		if (!optionRef.current?.contains(e.target)) {
			setOptionQT("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	// for close option when click outside  end

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState("");

	// for getting selected option
	const [getSelectOp, setSelectOp] = useState({
		name: "",
		value: ""
	});

	// initialize hometown info for editing start
	useEffect(() => {
		if (getSelectOp.name === "QEdit") {
			setQuote(getSelectOp.value.quote);
		}
		// else if (getSelectOp.name === "CEdit") {
		// 	setCCity(getSelectOp.value.city);
		// 	setCCountry(getSelectOp.value.country);
		// }
	}, [getSelectOp]);
	// initialize hometown info for editing end

	// for close delete popup when click outside start
	const deleteRef = useRef();

	const handleClickOutsideDel = (e) => {
		if (!deleteRef.current?.contains(e.target)) {
			setSelectOp({ name: "", value: "" });
			setQuoteT(false);
			// setCurrentCT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDel);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideDel);
	}, []);
	// for close delete popup when click outside  start

	// for add quotation on server start
	const addQuote = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/add-quote?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({ quote: getQuote }),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Added your quotation successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setQuoteT(false);
					setQuote("");
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
	// for adding quote on server end

	// for update quote on server start
	const updateQuote = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/update-quote?id=${getSelectOp.value.id}`,
				{
					method: "POST",
					body: JSON.stringify({ quote: getQuote }),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Updated your quotation successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setQuoteT(false);
					setQuote("");
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
	// for update quote on server end

	// for delete quote from server start
	const deleteQuote = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-quote/${getSelectOp.value.id}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Deleted your quotation successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setQuote("");
					setQuoteT(false);
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
	// for delete quote from server end

	return (
		<div className="row m-0">
			<div className="col p-0">
				<div className="about-you-container">
					<h5>About You</h5>

					{/* quote start  */}
					<div
						className="add-new"
						onClick={() => {
							setQuoteT(true);
							// setCurrentCT(false);
							setQuote("");
							setSelectOp({ name: "", value: "" });
						}}
					>
						{quoteT ? (
							<p style={{ color: "black", margin: "0" }}>Favourite Quotation</p>
						) : (
							<>
								<i className="bi bi-plus-circle-dotted"></i>
								<p>Add favourite Quotation</p>
							</>
						)}
					</div>

					{/* input-fields showing start  */}
					{(quoteT || getSelectOp.name === "QEdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "QEdit" && (
								<p className="modify-fields">Edit Favourite Quotation</p>
							)}
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="quote"
									placeholder="quote"
									onChange={(e) => setQuote(e.target.value)}
									value={getQuote}
								/>
								<label htmlFor="quote">Quote *</label>
							</div>

							<div className="submit-btn-con">
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										setQuoteT(false);
										setQuote("");
										setSelectOp({ name: "", value: "" });
									}}
								>
									Cancel
								</button>

								{(quoteT || getSelectOp.name === "QEdit") && (
									<button
										type="button"
										className="btn btn-primary"
										onClick={
											getSelectOp.name === "QEdit" ? updateQuote : addQuote
										}
									>
										{isLoading ? (
											<i
												className="fa-solid fa-spinner fa-spin"
												id="loading"
											></i>
										) : getSelectOp.name === "QEdit" ? (
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

					{/* displaying quotes start  */}
					{getProfile?.quotations?.length > 0 && (
						<div className="displaying-quote">
							{getProfile.quotations.map((value, index) => {
								return (
									<div className="a-work" key={index}>
										<div id="left">
											<div className="Edit">
												<p id="up">{`❝${value.quote}❞`}</p>

												<p id="down">Favorite Quotation</p>
											</div>
										</div>

										<div id="right">
											<div className="option">
												<i
													className="fa-solid fa-ellipsis"
													onClick={() => setOptionQT(value._id)}
												></i>

												{optionQT === value._id && (
													<ul ref={optionRef}>
														<li
															onClick={() => {
																setOptionQT("");
																setSelectOp({
																	name: "QEdit",
																	value: {
																		quote: value.quote,
																		id: value._id
																	}
																});
																setQuoteT(false);
															}}
														>
															<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
															Edit
														</li>

														<li
															onClick={() => {
																setOptionQT("");
																setSelectOp({
																	name: "QDelete",
																	value: {
																		id: value._id
																	}
																});
																setQuoteT(false);
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
								);
							})}
						</div>
					)}
					{/* displaying details end */}

					{/* conform popup for delete quote start  */}
					{getSelectOp.name === "QDelete" && (
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
										Are you sure you want to remove this quotation from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteQuote}
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
					{/* conform popup for delete quote end */}
					{/* quote end  */}
				</div>
			</div>
		</div>
	);
};

export default AboutYou;
