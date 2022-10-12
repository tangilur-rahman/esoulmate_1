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

	// for getting selected new interested
	const [newInterest, setNewInterest] = useState("");

	// new interested array
	const [newInArr, setNewInArr] = useState(
		getProfile?.interested?.length > 0 ? getProfile.interested : []
	);

	// for inserting new Interest in newInArr
	useEffect(() => {
		if (newInterest) {
			setNewInArr([...newInArr, newInterest]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newInterest]);

	// for removing duplicate element from which one already exist in interested start
	const [uniqueArr, setUniqueArr] = useState(interestList);

	useEffect(() => {
		if (newInArr.length > 0) {
			setUniqueArr(uniqueArr.filter((el) => !newInArr.includes(el.item)));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newInArr]);
	// for removing duplicate element from which one already exist in interested end

	// for removing selected interested start
	const [removeIn, setRemoveIn] = useState("");

	useEffect(() => {
		if (removeIn) {
			setNewInArr(newInArr.filter((e) => e !== removeIn));
			setUniqueArr([...uniqueArr, { item: removeIn }]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [removeIn]);
	// for removing selected interested end

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
								{newInArr?.length > 0 ? (
									<h5>
										Edit {newInArr?.length > 1 ? "Interests" : "Interest"}
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
									{newInArr?.length > 0 ? (
										newInArr.map((value, index) => {
											return (
												<span key={index} onClick={() => setRemoveIn(value)}>
													{value} <i className="fa-solid fa-x"></i>
												</span>
											);
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
										{uniqueArr
											.filter((value) => {
												return new RegExp(getSearch, "i").test(value.item);
											})
											.map((result, index) => {
												return (
													<span
														key={index}
														onClick={() => setNewInterest(result.item)}
													>
														{result.item}
													</span>
												);
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
							{newInArr?.length > 0 ? (
								<span className="hover-link">Edit your interest</span>
							) : (
								<span className="hover-link">Add your interest</span>
							)}
						</button>
					</div>
				) : newInArr?.length > 0 ? (
					""
				) : (
					<span id="empty-interested-message">Empty</span>
				)}
			</div>
		</>
	);
};

export default Interested;
