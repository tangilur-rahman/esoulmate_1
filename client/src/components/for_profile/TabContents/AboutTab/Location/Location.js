// external components
import { useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./Location.css";

const Location = ({ getProfile }) => {
	// for updating profile-page
	const { setUpdateProfile } = GetContextApi();

	// for hometown input fields toggle
	const [homeT, setHomeT] = useState(false);

	// for current-city input-fields toggle
	const [currentT, setCurrentT] = useState(false);

	// for getting input-fields value
	const [getCity, setCity] = useState("");
	const [getCountry, setCountry] = useState("");

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState("");

	// for add hometown on server start
	const addHometown = async () => {
		try {
			setIsLoading(true);

			const hometownInfo = {
				city: getCity,
				country: getCountry
			};

			const response = await fetch(
				`/user/about/add-home-location?id=${getProfile._id}`,
				{
					method: "POST",
					body: JSON.stringify(hometownInfo),
					headers: { "Content-Type": "application/json" }
				}
			);

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Added your hometown successfully.", {
					position: "top-right",
					theme: "colored",
					autoClose: 2000
				});

				setTimeout(() => {
					setUpdateProfile(Date.now());
					setCity("");
					setCountry("");
					setHomeT("");
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
	// for add hometown on server end

	// for update hometown on server start
	const updateHometown = () => {};
	// for update hometown on server end

	return (
		<div className="row m-0">
			<div className="col p-0">
				<div className="location-container">
					<h5>Location</h5>

					{/* home-town start  */}
					{!getProfile.hometown.city && (
						<div
							className="add-new"
							onClick={() => {
								setHomeT(true);
								setCurrentT(false);
								setCity("");
								setCountry("");
							}}
						>
							{homeT ? (
								<p style={{ color: "black", margin: "0" }}>Hometown</p>
							) : (
								<>
									<i className="bi bi-plus-circle-dotted"></i>
									<p>Add hometown</p>
								</>
							)}
						</div>
					)}

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
										onClick={!"Edit" ? updateHometown : addHometown}
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
					{/* home-town end  */}

					{/* current-city start  */}
					<div
						className="add-new"
						onClick={() => {
							setHomeT(false);
							setCurrentT(true);
							setCity("");
							setCountry("");
						}}
					>
						{currentT ? (
							<p style={{ color: "black", margin: "0" }}>Current Town</p>
						) : (
							<>
								<i className="bi bi-plus-circle-dotted"></i>
								<p>Add Current City</p>
							</>
						)}
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
					{/* current-city end  */}
				</div>
			</div>
		</div>
	);
};

export default Location;
