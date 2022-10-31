// external components
import { useState } from "react";
import { toast } from "react-toastify";

// internal components
import DayDropdown from "./DayDropdown/DayDropdown";
import MonthDropdown from "./MonthDropdown/MonthDropdown";
import "./WorkEducation.css";
import YearDropdown from "./YearDropdown/YearDropdown";

const WorkEducation = ({ getProfile }) => {
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

	// add work submit on server start
	const addWorkHandler = async () => {
		try {
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
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
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
							onClick={() => setAddWorkT(true)}
						>
							<i className="bi bi-plus-circle-dotted"></i>
							<p>Add a workplace</p>
						</div>
					)}

					{addWorkT && (
						<div className="add-work-fields">
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Company"
									placeholder="Company"
									onChange={(e) => setCompany(e.target.value)}
									value={getCompany}
								/>
								<label htmlFor="Company">Company</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Position"
									placeholder="Position"
									onChange={(e) => setPosition(e.target.value)}
									value={getPosition}
								/>
								<label htmlFor="Position">Position</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="City/Town"
									placeholder="City/Town"
									onChange={(e) => setCity(e.target.value)}
									value={getCity}
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
									value={getDescription}
								></textarea>
								<label htmlFor="floatingTextarea2">Description</label>
							</div>

							<div className="time-period-container">
								<h6>Time Period</h6>

								<div className="form-check">
									<input
										class="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										onClick={() => setCurrWork(!currWork)}
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
								<div id="left">
									<i className="fa-solid fa-earth-americas"></i> <p>Public</p>
								</div>

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
										}}
									>
										Cancel
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={addWorkHandler}
										disabled={getCompany ? false : true}
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					)}
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
