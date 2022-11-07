// external components
import { useState } from "react";

// internal components
import "./Location.css";

const Location = ({ getProfile }) => {
	// for hometown input fields toggle
	const [homeT, setHomeT] = useState(false);

	// for current-city input-fields toggle
	const [currentT, setCurrentT] = useState(false);

	// for getting input-fields value
	const [getCity, setCity] = useState("");
	const [getCountry, setCountry] = useState("");

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState("");

	return (
		<div className="row m-0">
			<div className="col p-0">
				<div className="location-container">
					<h5>Location</h5>

					{/* city start  */}
					<div
						className="add-new"
						onClick={() => {
							setHomeT(true);
							setCurrentT(false);
							setCity("");
							setCountry("");
						}}
					>
						<i className="bi bi-plus-circle-dotted"></i>
						<p>Add hometown</p>
					</div>

					{homeT && (
						<div className="input-fields">
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="city"
									placeholder="city"
									onChange={(e) => setCity(e.target.value)}
									value={getCity}
								/>
								<label htmlFor="city">City *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="country"
									placeholder="country"
									onChange={(e) => setCountry(e.target.value)}
									value={getCountry}
								/>
								<label htmlFor="country">Country *</label>
							</div>

							<div className="submit-btn-con">
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										setHomeT(false);
										setCity("");
										setCountry("");
									}}
								>
									Cancel
								</button>

								{(currentT || "Edit") && (
									<button
										type="button"
										className="btn btn-primary"
										onClick={!"Edit" ? "updateUniHandler" : "addUniHandler"}
										disabled={getCity && getCountry ? false : true}
									>
										{isLoading ? (
											<i
												className="fa-solid fa-spinner fa-spin"
												id="loading"
											></i>
										) : !"Edit" ? (
											"Update"
										) : (
											"Submit"
										)}
									</button>
								)}
							</div>
						</div>
					)}
					{/* city end  */}

					{/* country start  */}
					<div
						className="add-new"
						onClick={() => {
							setHomeT(false);
							setCurrentT(true);
							setCity("");
							setCountry("");
						}}
					>
						<i className="bi bi-plus-circle-dotted"></i>
						<p>Add Current City</p>
					</div>

					{currentT && (
						<div className="input-fields">
							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="city"
									placeholder="city"
									onChange={(e) => setCity(e.target.value)}
									value={getCity}
								/>
								<label htmlFor="city">City *</label>
							</div>

							<div className="form-floating mb-3">
								<input
									className="form-control outline-sty"
									id="country"
									placeholder="country"
									onChange={(e) => setCountry(e.target.value)}
									value={getCountry}
								/>
								<label htmlFor="country">Country *</label>
							</div>

							<div className="submit-btn-con">
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										setCurrentT(false);
										setCity("");
										setCountry("");
									}}
								>
									Cancel
								</button>

								{(currentT || "Edit") && (
									<button
										type="button"
										className="btn btn-primary"
										onClick={!"Edit" ? "updateUniHandler" : "addUniHandler"}
										disabled={getCity && getCountry ? false : true}
									>
										{isLoading ? (
											<i
												className="fa-solid fa-spinner fa-spin"
												id="loading"
											></i>
										) : !"Edit" ? (
											"Update"
										) : (
											"Submit"
										)}
									</button>
								)}
							</div>
						</div>
					)}
					{/* country end  */}
				</div>
			</div>
		</div>
	);
};

export default Location;
