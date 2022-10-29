// external components
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// own components
import Navbar from "../../components/Navbar/Navbar";
import Preloader from "./../../components/Preloader/Preloader";

import ProfileImg from "../../components/for_profile/ProfileImg/ProfileImg";
import ProfileTabs from "../../components/for_profile/ProfileTabs/ProfileTabs";
import AboutTab from "../../components/for_profile/TabContents/AboutTab/AboutTab";
import AudioTab from "../../components/for_profile/TabContents/AudioTab/AudioTab";
import BookmarksTab from "../../components/for_profile/TabContents/BookmarksTab/BookmarksTab";
import PdfTab from "../../components/for_profile/TabContents/PdfTab/PdfTab";
import PhotosTab from "../../components/for_profile/TabContents/PhotosTab/PhotosTab";
import PostsTab from "../../components/for_profile/TabContents/PostsTab/PostsTab";
import PurchasedTab from "../../components/for_profile/TabContents/PurchasedTab/PurchasedTab";
import VideosTab from "../../components/for_profile/TabContents/VideosTab/VideosTab";
import WishlistTab from "../../components/for_profile/TabContents/WishlistTab/WishlistTab";

import { GetContextApi } from "../../ContextApi";
import "./ProfilePage.css";

const ProfilePage = () => {
	// for redirect "/log-in"
	const Navigate = useNavigate();

	// for setting current-user & update profile
	const { currentUser, setCurrentUser, updateProfile } = GetContextApi();

	// for getting profile-id
	const paramObj = useParams();
	const profile_id = paramObj.profile_id;

	// for toggle tab
	const [tabToggle, setTabToggle] = useState(1);

	// for loading animation until fetching isn't complete
	const [isLoading, setIsLoading] = useState(true);

	// for getting profile-docs
	const [getProfile, setProfile] = useState("");

	// for fetching selected profile-docs start
	const getProfileDoc = async () => {
		try {
			const response = await fetch(`/user/${profile_id}`);

			const result = await response.json();

			if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});
				setTimeout(() => {
					return Navigate("/");
				}, 3000);
			} else {
				setProfile(result);
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 2500
			});

			setTimeout(() => {
				return Navigate("/");
			}, 3000);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			getProfileDoc();
		}, 900);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile_id, updateProfile]);
	// for fetching selected profile-docs end

	// if currentUser is undefined then re-fetching start
	// for fetching current-user handler start
	const getCurrentUser = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/user");

			const result = await response.json();

			if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 2500
				});

				setTimeout(() => {
					return Navigate("/log-in");
				}, 3000);
			} else {
				setCurrentUser(result);
				setIsLoading(false);
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 2500
			});
			setTimeout(() => {
				return Navigate("/log-in");
			}, 3000);
		}
	};

	useEffect(() => {
		if (!currentUser) {
			setTimeout(() => {
				getCurrentUser();
			}, 900);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for fetching current-user handler start
	// if currentUser is undefined then re-fetching end

	return (
		<>
			{isLoading ? (
				<Preloader />
			) : (
				<div className="container-fluid p-0">
					<Navbar from_where="profile" />

					<div className="row profile-first-container m-0">
						<div className="col-lg-11 col-md-12 p-0 profile-img-container">
							<ProfileImg getProfile={getProfile} currentUser={currentUser} />
							<hr />
							<ProfileTabs setTabToggle={setTabToggle} tabToggle={tabToggle} />
						</div>
					</div>
					<div className="row profile-second-container m-0">
						<div className="col-lg-11 col-md-12 p-0">
							{tabToggle === 1 && (
								<PostsTab profile_id={profile_id} getProfile={getProfile} />
							)}

							{tabToggle === 2 && <AboutTab />}

							{tabToggle === 3 && <PhotosTab />}

							{tabToggle === 4 && <VideosTab />}

							{tabToggle === 5 && <AudioTab />}

							{tabToggle === 6 && <PdfTab />}

							{tabToggle === 7 && <BookmarksTab />}

							{tabToggle === 8 && <WishlistTab />}

							{tabToggle === 9 && <PurchasedTab />}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePage;
