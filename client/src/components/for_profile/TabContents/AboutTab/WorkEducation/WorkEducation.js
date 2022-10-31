// external components
import { useState } from "react";

// internal components
import DayDropdown from "./DayDropdown/DayDropdown";
import MonthDropdown from "./MonthDropdown/MonthDropdown";
import "./WorkEducation.css";
import YearDropdown from "./YearDropdown/YearDropdown";

const WorkEducation = () => {
	// for add work toggle
	const [addWorkT, setAddWorkT] = useState(false);

	// for checking currently working here or not
	const [currWork, setCurrWork] = useState(false);

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
								/>
								<label htmlFor="Company">Company</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="Position"
									placeholder="Position"
								/>
								<label htmlFor="Position">Position</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="City/Town"
									placeholder="City/Town"
								/>
								<label htmlFor="City/Town">City/Town</label>
							</div>

							<div className="form-floating">
								<textarea
									className="form-control outline-sty"
									placeholder="Description"
									id="floatingTextarea2"
									style={{ height: "100px" }}
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
									>
										I currently work here
									</label>
								</div>

								<div className="pick-time">
									{currWork ? (
										<div id="current-work">
											<span id="from">From</span> <YearDropdown />{" "}
											<MonthDropdown />
											<DayDropdown />
										</div>
									) : (
										<div id="previous-work">
											<YearDropdown /> <MonthDropdown />
											<DayDropdown /> <span>to</span> <YearDropdown />{" "}
											<MonthDropdown />
											<DayDropdown />
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
										onClick={() => setAddWorkT(false)}
									>
										Cancel
									</button>
									<button type="button" className="btn btn-primary">
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
