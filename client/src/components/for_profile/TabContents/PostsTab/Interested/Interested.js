// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./Interested.css";
import interestList from "./interestList.json";

const Interested = ({ getProfile, interestPopT, setInterestPopT }) => {
	// for getting currentUser
	const { currentUser, setUpdateProfile } = GetContextApi();

	// for loading until not submitted on server
	const [isLoading, setIsLoading] = useState(false);

	// for close outside clicked start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setInterestPopT(false);
			setSearch("");
			setNewInterest("");
			setRemoveIn("");
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

	// new interested array initialization start
	const [newInArr, setNewInArr] = useState([]);

	useEffect(() => {
		if (getProfile) {
			setNewInArr(
				getProfile?.interested?.length > 0 ? getProfile.interested : []
			);
		}
	}, [getProfile]);
	// new interested array initialization end

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

	// submit interested on server start
	const submitInterested = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/user/interested", {
				method: "POST",
				body: JSON.stringify({ newInArr }),
				headers: { "Content-Type": "application/json" }
			});

			const result = await response.json();

			if (response.status === 200) {
				toast.success("Interest updated.", {
					position: "top-right",
					theme: "colored",
					autoClose: 1500
				});

				setNewInArr(result ? result : []);
				setSearch("");
				setNewInterest("");
				setRemoveIn("");
				setUpdateProfile(Date.now());
				setIsLoading(false);
				setInterestPopT(false);
			} else if (result.error) {
				toast(result.error, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 2500
			});
			setIsLoading(false);

			setTimeout(() => {
				setSearch("");
				setNewInterest("");
				setRemoveIn("");
				setInterestPopT(false);
			}, 3000);
		}
	};
	// submit interested on server end

	// for removing search input start
	useEffect(() => {
		if (newInterest) {
			setSearch("");
		}
	}, [newInterest]);
	// for removing search input end

	return (
		<>
			<div className="interested-container">
				<h5>Interested In</h5>

				<div className="interested-items">
					{getProfile?.interested?.length > 0 &&
						getProfile.interested
							.map((value, index) => {
								return <span key={index}>{value}</span>;
							})
							.reverse()}
				</div>

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
									value={getSearch}
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

							<div className="footer">
								<div className="privacy">🌍 Public</div>
								<div className="interested-btn-container">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => setInterestPopT(false)}
									>
										<span
											className="hover-link"
											onClick={() => {
												setInterestPopT(false);
												setSearch("");
												setNewInterest("");
												setRemoveIn("");
											}}
										>
											Cancel
										</span>
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={submitInterested}
									>
										<span className={isLoading ? "" : "hover-link"}>
											{isLoading ? (
												<i className="fa-solid fa-spinner fa-spin"></i>
											) : (
												"Save"
											)}
										</span>
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
