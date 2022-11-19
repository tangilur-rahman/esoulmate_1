// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./AboutYou.css";

const AboutYou = ({ getProfile }) => {
	// for updating profile-page
	const { setUpdateProfile } = GetContextApi();

	// for nick-name input fields toggle
	const [nickT, setNickT] = useState(false);

	// for quotation input fields toggle
	const [quoteT, setQuoteT] = useState(false);

	// for getting nick-name's input-field value
	const [getNick, setNick] = useState("");

	// for getting input-fields value for quotation
	const [getQuote, setQuote] = useState("");

	// for nick-name option toggle
	const [optionNT, setOptionNT] = useState("");

	// for quote option toggle
	const [optionQT, setOptionQT] = useState("");

	// for close option when click outside start
	const optionRef = useRef();

	const handleClickOutside = (e) => {
		if (!optionRef.current?.contains(e.target)) {
			setOptionQT("");
			setOptionNT("");
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
		} else if (getSelectOp.name === "NEdit") {
			setNick(getSelectOp.value.nickname);
		}
	}, [getSelectOp]);
	// initialize hometown info for editing end

	// for close delete popup when click outside start
	const deleteRef = useRef();

	const handleClickOutsideDel = (e) => {
		if (!deleteRef.current?.contains(e.target)) {
			setSelectOp({ name: "", value: "" });
			setQuoteT(false);
			setNickT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDel);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideDel);
	}, []);
	// for close delete popup when click outside  start

	// for add nickname on server start
	const addNickname = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/add-nickname?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify({ nickname: getNick }),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Added your nickname successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setNickT(false);
					setNick("");
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
	// for adding nickname on server end

	// for update nickname on server start
	const updateNickname = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/update-nickname?id=${getSelectOp.value.id}`,
				{
					method: "POST",
					body: JSON.stringify({ nickname: getNick }),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Updated your nickname successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setNickT(false);
					setNick("");
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
	// for update nickname on server end

	// for delete nickname from server start
	const deleteNickname = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/delete-nickname/${getSelectOp.value.id}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Deleted your nickname successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setNick("");
					setNickT(false);
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
	// for delete nickname from server end

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

					{/* nick-name start  */}
					<div
						className="add-new"
						onClick={() => {
							setNickT(true);
							setQuoteT(false);
							setNick("");
							setSelectOp({ name: "", value: "" });
						}}
					>
						{nickT ? (
							<p style={{ color: "black", margin: "0" }}>Your Nickname</p>
						) : (
							<>
								<i className="bi bi-plus-circle-dotted"></i>
								<p>Add your a new nickname</p>
							</>
						)}
					</div>

					{/* input-fields showing start  */}
					{(nickT || getSelectOp.name === "NEdit") && (
						<div className="input-fields" ref={deleteRef}>
							{getSelectOp.name === "NEdit" && (
								<p className="modify-fields">Edit your nickname</p>
							)}
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="nickname"
									placeholder="Nickname"
									onChange={(e) => setNick(e.target.value)}
									value={getNick}
								/>
								<label htmlFor="nickname">Nickname *</label>
							</div>

							<div className="submit-btn-con">
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										setNickT(false);
										setNick("");
										setSelectOp({ name: "", value: "" });
									}}
								>
									Cancel
								</button>

								{(nickT || getSelectOp.name === "NEdit") && (
									<button
										type="button"
										className="btn btn-primary"
										onClick={
											getSelectOp.name === "NEdit"
												? updateNickname
												: addNickname
										}
										disabled={getNick ? false : true}
									>
										{isLoading ? (
											<i
												className="fa-solid fa-spinner fa-spin"
												id="loading"
											></i>
										) : getSelectOp.name === "NEdit" ? (
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
					{getProfile?.nicknames?.length > 0 && (
						<div className="displaying-quote">
							{getProfile.nicknames.map((value, index) => {
								return (
									<>
										{value.nickname && (
											<>
												<div className="a-work" key={index}>
													<div id="left">
														<div className="Edit">
															<p id="up">{value.nickname}</p>

															<p id="down">Your Nickname</p>
														</div>
													</div>

													<div id="right">
														<div className="option">
															<i
																className="fa-solid fa-ellipsis"
																onClick={() => setOptionNT(value._id)}
															></i>

															{optionNT === value._id && (
																<ul ref={optionRef}>
																	<li
																		onClick={() => {
																			setOptionNT("");
																			setSelectOp({
																				name: "NEdit",
																				value: {
																					nickname: value.nickname,
																					id: value._id
																				}
																			});
																			setNickT(false);
																		}}
																	>
																		<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
																		Edit
																	</li>

																	<li
																		onClick={() => {
																			setOptionNT("");
																			setSelectOp({
																				name: "NDelete",
																				value: {
																					id: value._id
																				}
																			});
																			setNickT(false);
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
											</>
										)}
									</>
								);
							})}
						</div>
					)}
					{/* displaying details end */}

					{/* conform popup for delete nick-name start  */}
					{getSelectOp.name === "NDelete" && (
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
										Are you sure you want to remove this nickname from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteNickname}
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
					{/* conform popup for delete nick-name end */}
					{/* nick-name end  */}

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
										disabled={getQuote ? false : true}
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
