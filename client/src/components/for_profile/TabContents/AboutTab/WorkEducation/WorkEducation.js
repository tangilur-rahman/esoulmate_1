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
		if (selectOp && selectOp.name === "Details") {
			setFromYear(selectOp.value.fromYear);
			setFromMonth(selectOp.value.fromMonth);
			setFromDay(selectOp.value.fromDay);

			setToYear(selectOp.value.toYear);
			setToMonth(selectOp.value.toMonth);
			setToDay(selectOp.value.toDay);
			setCurrWork(selectOp.value.toYear ? false : true);
		}

		if (addWorkT) {
			setFromYear("");
			setFromMonth("");
			setFromDay("");

			setToYear("");
			setToMonth("");
			setToDay("");
			setCurrWork(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectOp, addWorkT]);
	// for assign selected option's values into time-period end

	// for close option when click outside start
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
					{(addWorkT || selectOp.name === "Details") && (
						<div className="add-work-fields">
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Company"
									placeholder="Company"
									onChange={(e) => setCompany(e.target.value)}
									value={
										selectOp.name === "Details"
											? selectOp.value.company
											: getCompany
									}
								/>
								<label htmlFor="Company">Company</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Position"
									placeholder="Position"
									onChange={(e) => setPosition(e.target.value)}
									value={
										selectOp.name === "Details"
											? selectOp.value.position
											: getPosition
									}
								/>
								<label htmlFor="Position">Position</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="City/Town"
									placeholder="City/Town"
									onChange={(e) => setCity(e.target.value)}
									value={
										selectOp.name === "Details" ? selectOp.value.city : getCity
									}
								/>
								<label htmlFor="City/Town">City/Town</label>
							</div>

							<div className="form-floating">
								<textarea
									className="form-control outline-sty"
									placeholder="Description"
									id="floatingTextarea2"
									style={{ height: "100px" }}
									onChange={(e) => setDescription(e.target.value)}
									value={
										selectOp.name === "Details"
											? selectOp.value.description
											: getDescription
									}
								></textarea>
								<label htmlFor="floatingTextarea2">Description</label>
							</div>

							{!(selectOp.name === "Details" && !selectOp.value.fromYear) && (
								<div className="time-period-container">
									<h6>Time Period</h6>

									<div className="form-check">
										<input
											class="form-check-input"
											type="checkbox"
											id="flexCheckDefault"
											onClick={() => setCurrWork(!currWork)}
											checked={currWork ? true : false}
											disabled={selectOp.name === "Details" ? true : false}
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
												<YearDropdown
													getYear={fromYear}
													setYear={setFromYear}
													selectOption={
														selectOp.name === "Details" ? true : false
													}
												/>
												{(selectOp.name === "Details"
													? selectOp.value.fromMonth
													: fromYear) && (
													<MonthDropdown
														getMonth={fromMonth}
														setMonth={setFromMonth}
														selectOption={
															selectOp.name === "Details" ? true : false
														}
													/>
												)}

												{(selectOp.name === "Details"
													? selectOp.value.fromDay
													: fromMonth) && (
													<DayDropdown
														getDay={fromDay}
														setDay={setFromDay}
														selectOption={
															selectOp.name === "Details" ? true : false
														}
													/>
												)}
											</div>
										) : (
											<div id="previous-work">
												<YearDropdown
													getYear={fromYear}
													setYear={setFromYear}
													selectOption={
														selectOp.name === "Details" ? true : false
													}
												/>
												{(selectOp.name === "Details"
													? selectOp.value.fromMonth
													: fromYear) && (
													<MonthDropdown
														getMonth={fromMonth}
														setMonth={setFromMonth}
														selectOption={
															selectOp.name === "Details" ? true : false
														}
													/>
												)}
												{(selectOp.name === "Details"
													? selectOp.value.fromDay
													: fromMonth) && (
													<DayDropdown
														getDay={fromDay}
														setDay={setFromDay}
														selectOption={
															selectOp.name === "Details" ? true : false
														}
													/>
												)}
												<span>to</span>{" "}
												<YearDropdown
													getYear={toYear}
													setYear={setToYear}
													selectOption={
														selectOp.name === "Details" ? true : false
													}
												/>
												{(selectOp.name === "Details"
													? selectOp.value.toMonth
													: toYear) && (
													<MonthDropdown
														getMonth={toMonth}
														setMonth={setToMonth}
														selectOption={
															selectOp.name === "Details" ? true : false
														}
													/>
												)}
												{(selectOp.name === "Details"
													? selectOp.value.toDay
													: toDay) && (
													<DayDropdown
														getDay={toDay}
														setDay={setToDay}
														selectOption={
															selectOp.name === "Details" ? true : false
														}
													/>
												)}
											</div>
										)}
									</div>
								</div>
							)}

							<div className="work-edu-submit-con">
								<div id="left">
									<i className="fa-solid fa-earth-americas"></i> <p>Public</p>
								</div>

								<div id="right">
									<button
										type="button"
										className="btn btn-light"
										id={selectOp.name === "Details" ? "active" : ""}
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

									{addWorkT && (
										<button
											type="button"
											className="btn btn-primary"
											onClick={addWorkHandler}
											disabled={getCompany ? false : true}
										>
											{isLoading ? (
												<i
													className="fa-solid fa-spinner fa-spin"
													id="loading"
												></i>
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
												<div className="details">
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
												<i className="fa-solid fa-earth-americas"></i>
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
																	setSelectOp({ name: "Details", value });
																	setAddWorkT(false);
																}}
															>
																<i className="fa-solid fa-eye option-icon"></i>{" "}
																Details
															</li>
															<li
																onClick={() => {
																	setOptionT("");
																	setSelectOp({ name: "Delete", value });
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
