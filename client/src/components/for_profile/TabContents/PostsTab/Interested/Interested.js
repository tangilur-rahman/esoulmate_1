// external components
import { useEffect, useRef, useState } from "react";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./Interested.css";
import interestList from "./interestList.json";

const Interested = ({ getProfile, interestPopT, setInterestPopT }) => {
	// for getting currentUser
	const { currentUser } = GetContextApi();

	// for close outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setInterestPopT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close outside clicked end

	// for getting search-input
	const [getSearch, setSearch] = useState("");

	return (
		<>
			<div className="interested-container">
				<h5>Interested In</h5>

				<div className="interested-items"></div>

				{interestPopT && (
					<div className="interested-popup">
						<div
							className="interested-popup-wrapper"
							data-aos="fade-down"
							ref={myRef}
						>
							<div className="header">
								{getProfile?.interested?.length > 0 ? (
									<h5>
										Edit{" "}
										{getProfile?.interested?.length > 1
											? "Interests"
											: "Interest"}
									</h5>
								) : (
									<h5>Add Your Interest</h5>
								)}

								<div
									className="close-btn"
									onClick={() => setInterestPopT(false)}
								>
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>

							<div className="search-bar">
								<i className="bi bi-search"></i>
								<input
									type="search"
									id="search"
									autoComplete="off"
									placeholder="Search . . ."
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>

							<div className="selected-interest">
								<p>Selected Interest</p>
								<div className="displaying">
									{getProfile?.interested?.length > 0 ? (
										getProfile.interested.map((value, index) => {
											return <span key={index}>{value}</span>;
										})
									) : (
										<div id="empty">Empty</div>
									)}
								</div>
							</div>

							{getSearch && (
								<div className="search-result">
									<p>Results for :&nbsp; &nbsp;" {getSearch} "</p>
									<div className="displaying-result">
										{interestList
											.filter((value) => {
												return new RegExp(getSearch, "i").test(value.item);
											})
											.map((result, index) => {
												return <span key={index}>{result.item}</span>;
											})}
									</div>
								</div>
							)}

							<div className="footer">
								<div className="privacy">
									🌍 <p>Interests are public</p>
								</div>
								<div className="interested-btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => setInterestPopT(false)}
									>
										<span className="hover-link">Cancel</span>
									</button>
									<button type="button" className="btn btn-primary">
										<span className="hover-link">Save</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{currentUser?._id === getProfile?._id ? (
					<div className="interested-btn">
						<button
							type="button"
							onClick={() => setInterestPopT(!interestPopT)}
						>
							{getProfile?.interested?.length > 0 ? (
								<span className="hover-link">Edit your interest</span>
							) : (
								<span className="hover-link">Add your interest</span>
							)}
						</button>
					</div>
				) : getProfile?.interested?.length > 0 ? (
					""
				) : (
					<span id="empty-interested-message">Empty</span>
				)}
			</div>
		</>
	);
};

export default Interested;
