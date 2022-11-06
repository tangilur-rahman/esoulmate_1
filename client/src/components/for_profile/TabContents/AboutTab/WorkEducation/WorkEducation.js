// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import DayDropdown from "./DayDropdown/DayDropdown";
import MonthDropdown from "./MonthDropdown/MonthDropdown";
import "./WorkEducation.css";
import YearDropdown from "./YearDropdown/YearDropdown";

const WorkEducation = ({ getProfile }) => {
	// for updating profile
	const { setUpdateProfile } = GetContextApi();

	// for loading animation until doesn't response from server
	const [isLoading, setIsLoading] = useState(false);

	// for add work toggle
	const [addWorkT, setAddWorkT] = useState(false);

	// for checking now currently working here or not
	const [currWork, setCurrWork] = useState(false);

	// for getting input-fields value
	const [getCompany, setCompany] = useState("");
	const [getPosition, setPosition] = useState("");
	const [getCity, setCity] = useState("");
	const [getDescription, setDescription] = useState("");

	// for pick period
	const [fromYear, setFromYear] = useState("");
	const [fromMonth, setFromMonth] = useState("");
	const [fromDay, setFromDay] = useState("");

	const [toYear, setToYear] = useState("");
	const [toMonth, setToMonth] = useState("");
	const [toDay, setToDay] = useState("");

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

	// for option toggle
	const [optionT, setOptionT] = useState("");

	// for getting selected option
	const [selectOp, setSelectOp] = useState({
		name: "",
		value: {
			company: "",
			position: "",
			city: "",
			description: "",
			fromYear: "",
			fromMonth: "",
			fromDay: "",
			toYear: "",
			toMonth: "",
			toDay: ""
		}
	});

	// for assign selected option's values into time-period start
	useEffect(() => {
		if (selectOp.name === "Edit") {
			setCompany(selectOp.value.company);
			setPosition(selectOp.value.position);
			setCity(selectOp.value.city);
			setDescription(selectOp.value.description);

			setFromYear(selectOp.value.fromYear);
			setFromMonth(selectOp.value.fromMonth);
			setFromDay(selectOp.value.fromDay);

			setToYear(selectOp.value.toYear);
			setToMonth(selectOp.value.toMonth);
			setToDay(selectOp.value.toDay);
			setCurrWork(selectOp.value.toYear ? false : true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectOp]);
	// for assign selected option's values into time-period end

	// when want to add new work-place start
	useEffect(() => {
		if (addWorkT) {
			setCompany("");
			setPosition("");
			setCity("");
			setDescription("");

			setFromYear("");
			setFromMonth("");
			setFromDay("");

			setToYear("");
			setToMonth("");
			setToDay("");
			setCurrWork(false);
		}
	}, [addWorkT]);
	// when want to add new work-place end

	// for close option when click outside withing start
	const workRef = useRef();

	const handleClickOutside = (e) => {
		if (!workRef.current?.contains(e.target)) {
			setOptionT("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// for delete popup
	const deleteRef = useRef();

	const handleClickOutsideDel = (e) => {
		if (!deleteRef.current?.contains(e.target)) {
			setSelectOp({
				name: "",
				value: {
					company: "",
					position: "",
					city: "",
					description: "",
					fromYear: "",
					fromMonth: "",
					fromDay: "",
					toYear: "",
					toMonth: "",
					toDay: ""
				}
			});
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDel);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideDel);
	}, []);
	// for close option when click outside end

	// add work submit on server start
	const addWorkHandler = async () => {
		try {
			setIsLoading(true);

			const workInfo = {
				company: getCompany,
				position: getPosition,
				city: getCity,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/add-work?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(workInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Work-place added successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddWorkT(false);
					setCurrWork(false);
					setCompany("");
					setPosition("");
					setCity("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
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
	//add work submit on server end

	// update work submit on server start
	const updateWorkHandler = async () => {
		try {
			setIsLoading(true);

			const workInfo = {
				company: getCompany,
				position: getPosition,
				city: getCity,
				description: getDescription,
				fromYear,
				fromMonth,
				fromDay,
				toYear,
				toMonth,
				toDay
			};

			const response = await fetch(
				`/user/about/update-work?id=${selectOp.value._id}`,
				{
					method: "POST",
					body: JSON.stringify(workInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Work-place updated successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setAddWorkT(false);
					setCurrWork(false);
					setCompany("");
					setPosition("");
					setCity("");
					setDescription("");
					setFromYear("");
					setFromMonth("");
					setFromDay("");
					setToYear("");
					setToMonth("");
					setFromDay("");
					setIsLoading(false);
					setSelectOp({
						name: "",
						value: {
							company: "",
							position: "",
							city: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});
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
	//add update submit on server end

	// for deleting add-worked start
	const deleteWorkHandler = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`/user/about/add-work/delete/${selectOp.value}`
			);

			const result = await response.json();

			if (response.status === 200) {
				toast("Work-place deleted successfully.", {
					position: "top-right",
					theme: "dark",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setSelectOp({
						name: "",
						value: {
							company: "",
							position: "",
							city: "",
							description: "",
							fromYear: "",
							fromMonth: "",
							fromDay: "",
							toYear: "",
							toMonth: "",
							toDay: ""
						}
					});

					setIsLoading(false);
				}, 2000);
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
	// for deleting add-worked end

	return (
		<div className="row m-0">
			<div className="col p-0 work-edu-container">
				{/* work start  */}
				<div className="work-container">
					<h5 className="work-edu-header">Work</h5>

					{!addWorkT && (
						<div
							className="work-edu-add-section"
							onClick={() => {
								setAddWorkT(true);
								setSelectOp({
									name: "",
									value: {
										company: "",
										position: "",
										city: "",
										description: "",
										fromYear: "",
										fromMonth: "",
										fromDay: "",
										toYear: "",
										toMonth: "",
										toDay: ""
									}
								});
							}}
						>
							<i className="bi bi-plus-circle-dotted"></i>
							<p>Add a workplace</p>
						</div>
					)}

					{/* add new work start  */}
					{(addWorkT || selectOp.name === "Edit") && (
						<div className="add-work-fields" ref={deleteRef}>
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Company"
									placeholder="Company"
									onChange={(e) => setCompany(e.target.value)}
									value={getCompany}
								/>
								<label htmlFor="Company">Company *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Position"
									placeholder="Position"
									onChange={(e) => setPosition(e.target.value)}
									value={getPosition}
								/>
								<label htmlFor="Position">Position *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="City/Town"
									placeholder="City/Town"
									onChange={(e) => setCity(e.target.value)}
									value={getCity}
								/>
								<label htmlFor="City/Town">City/Town *</label>
							</div>

							<div className="form-floating">
								<textarea
									className="form-control outline-sty"
									placeholder="Description"
									id="floatingTextarea2"
									style={{ height: "100px" }}
									onChange={(e) => setDescription(e.target.value)}
									value={getDescription}
								></textarea>
								<label htmlFor="floatingTextarea2">Description</label>
							</div>

							<div className="time-period-container">
								<h6>Time Period</h6>

								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										onClick={() => setCurrWork(!currWork)}
										checked={currWork ? true : false}
										readOnly
									/>

									<label
										className="form-check-label"
										htmlFor="flexCheckDefault"
										id="checkbox-text"
									>
										I currently work here.
									</label>
								</div>

								<div className="pick-time">
									{currWork ? (
										<div id="current-work">
											<span id="from">From</span>
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}

											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
										</div>
									) : (
										<div id="previous-work">
											<YearDropdown getYear={fromYear} setYear={setFromYear} />
											{fromYear && (
												<MonthDropdown
													getMonth={fromMonth}
													setMonth={setFromMonth}
												/>
											)}
											{fromMonth && (
												<DayDropdown getDay={fromDay} setDay={setFromDay} />
											)}
											<span>to</span>{" "}
											<YearDropdown getYear={toYear} setYear={setToYear} />
											{toYear && (
												<MonthDropdown
													getMonth={toMonth}
													setMonth={setToMonth}
												/>
											)}
											{toMonth && (
												<DayDropdown getDay={toDay} setDay={setToDay} />
											)}
										</div>
									)}
								</div>
							</div>

							<div className="work-edu-submit-con">
								<div id="right">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											setAddWorkT(false);
											setCurrWork(false);
											setCompany("");
											setPosition("");
											setCity("");
											setDescription("");
											setFromYear("");
											setFromMonth("");
											setFromDay("");
											setToYear("");
											setToMonth("");
											setFromDay("");
											setIsLoading(false);
											setSelectOp({
												name: "",
												value: {
													company: "",
													position: "",
													city: "",
													description: "",
													fromYear: "",
													fromMonth: "",
													fromDay: "",
													toYear: "",
													toMonth: "",
													toDay: ""
												}
											});
										}}
									>
										Cancel
									</button>

									{(addWorkT || selectOp.name === "Edit") && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={
												selectOp.name === "Edit"
													? updateWorkHandler
													: addWorkHandler
											}
											disabled={
												getCompany && getPosition && getCity && fromYear
													? false
													: true
											}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
											) : selectOp.name === "Edit" ? (
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
					{/* add new work end  */}

					{/* displaying work start  */}
					{getProfile?.work?.length > 0 && (
						<div className="displaying-work">
							{getProfile.work
								.map((value, index) => {
									return (
										<div className="a-work" key={index}>
											<div id="left">
												<i className="fa-solid fa-briefcase"></i>
												<div className="Edit">
													<p id="up">
														<h6>{value.position ? value.position : "Work"}</h6>
														&nbsp;at&nbsp; <h6>{value.company}</h6>
														{value.city && (
															<>
																&nbsp;in&nbsp;<h6>{value?.city}</h6>
															</>
														)}
													</p>

													{value.fromYear && (
														<p id="down">
															{value.fromMonth && (
																<>
																	{fullMonth(value.fromMonth)} {value.fromDay}
																	,&nbsp;&nbsp;
																</>
															)}
															{value.fromYear} &nbsp;to&nbsp;
															{value.toYear ? (
																<>
																	{value.fromMonth && (
																		<>
																			{fullMonth(value.fromMonth)}{" "}
																			{value.fromDay}
																			,&nbsp;&nbsp;
																		</>
																	)}
																	{value.toYear}
																</>
															) : (
																"Present"
															)}
														</p>
													)}
												</div>
											</div>

											<div id="right">
												<div className="option">
													<i
														className="fa-solid fa-ellipsis"
														onClick={() => setOptionT(value._id)}
													></i>

													{optionT === value._id && (
														<ul ref={workRef}>
															<li
																onClick={() => {
																	setOptionT("");
																	setSelectOp({ name: "Edit", value });
																	setAddWorkT(false);
																}}
															>
																<i className="fa-solid fa-pen-to-square option-icon"></i>{" "}
																Edit
															</li>
															<li
																onClick={() => {
																	setOptionT("");
																	setSelectOp({
																		name: "Delete",
																		value: value._id
																	});
																	setAddWorkT(false);
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
								})
								.reverse()}
						</div>
					)}
					{/* displaying work end */}

					{/* conform popup for delete start  */}
					{selectOp.name === "Delete" && (
						<div className="work-del-popup" ref={workRef}>
							<div
								className="work-del-popup-wrapper"
								data-aos="fade-down"
								ref={deleteRef}
							>
								<div className="conformation-content">
									<h5>Are you sure?</h5>
									<hr />
									<p>
										Are you sure you want to remove this workplace from your
										profile?
									</p>

									<div className="conform-btn">
										<button
											type="button"
											className="btn btn-danger"
											onClick={deleteWorkHandler}
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
													value: {
														company: "",
														position: "",
														city: "",
														description: "",
														fromYear: "",
														fromMonth: "",
														fromDay: "",
														toYear: "",
														toMonth: "",
														toDay: ""
													}
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
											value: {
												company: "",
												position: "",
												city: "",
												description: "",
												fromYear: "",
												fromMonth: "",
												fromDay: "",
												toYear: "",
												toMonth: "",
												toDay: ""
											}
										})
									}
								>
									<i className="fa-solid fa-x"></i>
								</div>
							</div>
						</div>
					)}
					{/* conform popup for delete end */}
				</div>
				{/* work-end  */}

				{/* university start  */}
				<div className="university-container">
					<h5 className="work-edu-header">University</h5>
					<div className="work-edu-add-section">
						<i className="bi bi-plus-circle-dotted"></i>
						<p>Add a university</p>
					</div>
				</div>
				{/* university start  */}

				{/* college start  */}
				<div className="college-container">
					<h5 className="work-edu-header">College</h5>
					<div className="work-edu-add-section">
						<i className="bi bi-plus-circle-dotted"></i>
						<p>Add a college</p>
					</div>
				</div>
				{/* college end */}

				{/* school start  */}
				<div className="school-container">
					<h5 className="work-edu-header">School</h5>
					<div className="work-edu-add-section">
						<i className="bi bi-plus-circle-dotted"></i>
						<p>Add a school</p>
					</div>
				</div>
				{/* school end  */}
			</div>
		</div>
	);
};

export default WorkEducation;
