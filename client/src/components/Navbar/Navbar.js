// external components
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// internal components
import { GetContextApi } from "../../ContextApi";
import "./Navbar.css";

const Navbar = () => {
	// for redirect
	const Navigate = useNavigate();

	// for getting selected profile-id
	const { currentUser } = GetContextApi();

	const [searchToggle, setSearchToggle] = useState("");
	const [sittingT, setSittingT] = useState("");
	const [menuT, setMenuT] = useState("");

	// for outside-click closed search-bar start
	const searchRef = useRef();

	const handleClickOutside = (e) => {
		if (!searchRef.current?.contains(e.target)) {
			setSearchToggle(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside-click closed search-bar end

	// for outside-click closed search-bar start
	const sittingRef = useRef();

	const handleClickOutsideSitting = (e) => {
		if (!sittingRef.current?.contains(e.target)) {
			setSittingT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideSitting);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideSitting);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside-click closed search-bar end

	// for outside-click closed search-bar start
	const menuRef = useRef();

	const handleClickOutsideMenu = (e) => {
		if (!menuRef.current?.contains(e.target)) {
			setMenuT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideMenu);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideMenu);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside-click closed search-bar end

	return (
		<>
			<div className="container-fluid p-0">
				<div className="row nav-main-container m-0">
					<div className="col-11 p-0">
						<div className="row m-0">
							{/* **** navbar-left start **** */}
							<div
								className="col-3 p-0 navbar-left"
								onClick={() => Navigate("/")}
							>
								<img src="/assets/logo/esoulmate-logo.png" alt="logo" />
								<h2>Esoulmate</h2>
							</div>
							{/* **** navbar-left end ****  */}

							{/* **** navbar-middle start ****  */}
							<div className="col-4 p-0 navbar-middle">
								<div
									className={searchToggle ? "search-bar active" : "search-bar"}
									ref={searchRef}
								>
									<i
										className="bi bi-search-heart"
										onClick={() => setSearchToggle(!searchToggle)}
									></i>
									<input
										type="search"
										id="search"
										autoComplete="off"
										placeholder="Search for knowledge"
										onClick={() => setSearchToggle(true)}
									/>
								</div>
							</div>
							{/* **** navbar-middle end **** */}

							{/* **** navbar-right start **** */}
							<div className="col-xl-5 col-3 p-0 navbar-right">
								<div className="icon-style">
									<label htmlFor="create-post" id="create">
										<span>
											<i className="bi bi-plus-circle-dotted"></i>
										</span>
									</label>

									<span>
										<i className="bi bi-people-fill"></i>
									</span>

									<span>
										<i className="bi bi-chat-heart"></i>
									</span>

									<span>
										<i className="bi bi-bell"></i>
									</span>

									<span id="sitting">
										<i
											className="fa-solid fa-sliders"
											onClick={() => {
												setSittingT(!sittingT);
											}}
										></i>

										<ul
											className={sittingT ? "active" : "inactive"}
											ref={sittingRef}
										>
											<div
												className="profile-info"
												onClick={() => Navigate(`/profile/${currentUser._id}`)}
											>
												<img
													src={`/uploads/profile-img/${currentUser.profile_img}`}
													alt="profile-img"
												/>
												<h5>{currentUser.name}</h5>
											</div>

											<li
												onClick={() => {
													setSittingT(!sittingT);
												}}
											>
												<img src="/assets/icon/gear.png" alt="sitting-icon" />
												<h5>Sitting</h5>
											</li>

											<li
												onClick={() => {
													setSittingT(!sittingT);
												}}
											>
												<img
													src="/assets/icon/private.png"
													alt="sitting-icon"
												/>
												<h5>Privacy</h5>
											</li>

											<li
												onClick={() => {
													setSittingT(!sittingT);
												}}
											>
												<img
													src="/assets/icon/day_night.png"
													alt="sitting-icon"
												/>
												<h5>Night Mode</h5>
											</li>

											<li
												onClick={() => {
													setSittingT(!sittingT);
												}}
											>
												<img src="/assets/icon/logout.png" alt="sitting-icon" />
												<h5>Log out</h5>
											</li>
										</ul>
									</span>

									<span id="menu">
										<i
											className="fa-solid fa-bars-staggered"
											onClick={() => {
												setMenuT(!menuT);
											}}
										></i>

										<ul
											className={menuT ? "active-menu" : "inactive-menu"}
											ref={menuRef}
										>
											<li
												onClick={() => {
													setMenuT(!menuT);
												}}
											>
												<span>
													<i className="bi bi-people-fill"></i>
													<h5>People</h5>
												</span>
											</li>

											<li
												onClick={() => {
													setMenuT(!menuT);
												}}
											>
												<span>
													<i className="bi bi-chat-heart"></i>
													<h5>Messages</h5>
												</span>
											</li>

											<li
												onClick={() => {
													setMenuT(!menuT);
												}}
											>
												<span>
													<i className="bi bi-bell"></i>
													<h5>Notifications</h5>
												</span>
											</li>
										</ul>
									</span>
								</div>
							</div>
							{/* **** navbar-right end  **** */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
