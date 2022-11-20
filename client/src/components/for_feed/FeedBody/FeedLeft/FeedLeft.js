// external components
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// internal components
import { GetContextApi } from "../../../../ContextApi";
import "./FeedLeft.css";

const FeedLeft = () => {
	// for getting current-user
	const { currentUser } = GetContextApi();

	// for redirect router
	const Navigate = useNavigate();

	// for attach active class
	const [settings, setSettings] = useState(false);
	const [collections, setCollections] = useState(false);
	const [memories, setMemories] = useState(false);
	const [adManager, setAdManager] = useState(false);
	const [people, setPeople] = useState(false);
	const [page, setPage] = useState(false);
	const [purchased, setPurchased] = useState(false);

	const settingsClicked = () => {
		setSettings(true);
		setCollections(false);
		setMemories(false);
		setAdManager(false);
		setPeople(false);
		setPage(false);
		setPurchased(false);
	};

	const collectionsClicked = () => {
		setSettings(false);
		setCollections(true);
		setMemories(false);
		setAdManager(false);
		setPeople(false);
		setPage(false);
		setPurchased(false);
	};

	const memoriesClicked = () => {
		setSettings(false);
		setCollections(false);
		setMemories(true);
		setAdManager(false);
		setPeople(false);
		setPage(false);
		setPurchased(false);
	};

	const adManagerClicked = () => {
		setSettings(false);
		setCollections(false);
		setMemories(false);
		setAdManager(true);
		setPeople(false);
		setPage(false);
		setPurchased(false);
	};

	const peopleClicked = () => {
		setSettings(false);
		setCollections(false);
		setMemories(false);
		setAdManager(false);
		setPeople(true);
		setPage(false);
		setPurchased(false);
	};

	const pageClicked = () => {
		setSettings(false);
		setCollections(false);
		setMemories(false);
		setAdManager(false);
		setPeople(false);
		setPage(true);
		setPurchased(false);
	};

	const purchasedClicked = () => {
		setSettings(false);
		setCollections(false);
		setMemories(false);
		setAdManager(false);
		setPeople(false);
		setPage(false);
		setPurchased(true);
	};

	return (
		<>
			<div className="col-2 p-0 feed-left">
				{/* user-info section start  */}
				<div className="user-info">
					<img
						src={`/uploads/profile-img/${currentUser.profile_img}`}
						alt="profile-img"
						className="img-fluid"
						onClick={() =>
							Navigate(`/profile/${currentUser.username || currentUser._id}`)
						}
					/>

					<h5
						onClick={() =>
							Navigate(`/profile/${currentUser.username || currentUser._id}`)
						}
					>
						{currentUser.name}
					</h5>
				</div>
				{/* user-info section end  */}

				{/* sidebar start  */}
				<div className="sidebar-container">
					<span
						className={settings ? "settings-active" : null}
						onClick={settingsClicked}
					>
						<img src="/assets/icon/gear.png" alt="settings-icon" />
						<h5>Settings</h5>
					</span>

					<span
						className={collections ? "collections-active" : null}
						onClick={collectionsClicked}
					>
						<img src="/assets/icon/Collection.png" alt="collection-icon" />
						<h5>Collections</h5>
					</span>

					<span
						className={memories ? "memories-active" : null}
						onClick={memoriesClicked}
					>
						<img src="/assets/icon/memories.png" alt="memories-icon" />
						<h5>Memories</h5>
					</span>

					<span
						className={adManager ? "adManager-active" : null}
						onClick={adManagerClicked}
					>
						<img src="/assets/icon/Goal.png" alt="ad-manager-icon" />
						<h5>AD Manager</h5>
					</span>

					<span
						className={people ? "people-active" : null}
						onClick={peopleClicked}
					>
						<img src="/assets/icon/People.png" alt="people-icon" />
						<h5>People</h5>
					</span>

					<span className={page ? "page-active" : null} onClick={pageClicked}>
						<img src="/assets/icon/page.png" alt="page-icon" />
						<h5>Page</h5>
					</span>

					<span
						className={purchased ? "purchased-active" : null}
						onClick={purchasedClicked}
					>
						<img src="/assets/icon/purchased.png" alt="purchased-icon" />
						<h5>Purchased</h5>
					</span>

					<div id="btn-container">
						<button>
							<label htmlFor="create-post">
								<div className="hover-link">Sell Skill</div>
							</label>
						</button>
					</div>
				</div>
				{/*  sidebar end  */}
			</div>
		</>
	);
};

export default FeedLeft;
