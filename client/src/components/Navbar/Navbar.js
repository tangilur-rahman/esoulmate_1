// external components
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// internal components
import { GetContextApi } from "../../ContextApi";
import "./Navbar.css";

const Navbar = ({ from_where }) => {
	// for redirect
	const Navigate = useNavigate();

	// for getting selected profile-id
	const { currentUser } = GetContextApi();

	// for toggle
	const [searchToggle, setSearchToggle] = useState("");
	const [sittingT, setSittingT] = useState("");
	const [menuT, setMenuT] = useState("");

	// for control displaying dropdown
	const [waitSitting, setWaitSitting] = useState(true);
	const [waitMenu, setWaitMenu] = useState(true);

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
								className="col-1 p-0 navbar-left"
								onClick={() => Navigate("/")}
							>
								<img src="/assets/logo/esoulmate-logo.png" alt="logo" />
							</div>
							{/* **** navbar-left end ****  */}

							{/* **** navbar-middle start ****  */}
							<div className="col-4 p-0 navbar-middle">
								<div
									className={searchToggle ? "search-bar active" : "search-bar"}
									ref={searchRef}
								>
									<i
										className="bi bi-search"
										onClick={() => setSearchToggle(!searchToggle)}
									></i>
									<input
										type="search"
										id="search"
										autoComplete="off"
										placeholder="Search . . ."
										onClick={() => setSearchToggle(true)}
									/>
								</div>
							</div>
							{/* **** navbar-middle end **** */}

							{/* **** navbar-right start **** */}
							<div className="col-xl-4 col-3 p-0 navbar-right">
								<div className="icon-style">
									{from_where !== "home" && (
										<div id="home">
											<img
												src="/assets/icon/House.png"
												alt="house-icon"
												onClick={() => Navigate("/")}
												className="title-tip img-fluid"
											/>
											<h6 className="title-popup">Home</h6>
										</div>
									)}

									{from_where === "home" && (
										<span>
											<label htmlFor="create-post" id="create">
												<i className="bi bi-plus-circle-fill"></i>
											</label>
											<h6 className="title-popup" id="create-popup">
												Create Post
											</h6>
										</span>
									)}

									<span>
										<img src="/assets/icon/People.png" alt="people-icon" />
										<h6 className="title-popup">People</h6>
									</span>

									<span>
										<img
											src="/assets/icon/message.png"
											alt="message-icon"
											title="Message"
										/>
										<h6 className="title-popup" id="message-popup">
											Message
										</h6>
									</span>

									<span>
										<img
											src="/assets/icon/notification.png"
											alt="notification-icon"
										/>
										<h6 className="title-popup" id="notification-popup">
											Notification
										</h6>
									</span>

									<span id="sitting" ref={sittingRef}>
										<img
											src="/assets/icon/setting.png"
											alt="settings-icon"
											onClick={() => {
												setWaitSitting(false);
												setSittingT(!sittingT);
											}}
										/>

										{!sittingT && (
											<h6 className="title-popup" id="setting-popup">
												Setting
											</h6>
										)}

										<ul
											className={sittingT ? "active" : "inactive"}
											ref={sittingRef}
											style={
												waitSitting ? { display: "none" } : { display: "block" }
											}
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
												<h5>Settings</h5>
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
												setWaitMenu(false);
												setMenuT(!menuT);
											}}
										></i>

										<ul
											className={menuT ? "active-menu" : "inactive-menu"}
											ref={menuRef}
											style={
												waitMenu ? { display: "none" } : { display: "block" }
											}
										>
											<li
												onClick={() => {
													setMenuT(!menuT);
												}}
											>
												<span>
													<img
														src="/assets/icon/People.png"
														alt="people-icon"
													/>
													<h5>People</h5>
												</span>
											</li>

											<li
												onClick={() => {
													setMenuT(!menuT);
												}}
											>
												<span>
													<img
														src="/assets/icon/message.png"
														alt="people-icon"
													/>
													<h5>Messages</h5>
												</span>
											</li>

											<li
												onClick={() => {
													setMenuT(!menuT);
												}}
											>
												<span>
													<img
														src="/assets/icon/notification.png"
														alt="people-icon"
													/>
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
