// external components
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// own pages
import FeedPage from "./pages/FeedPage/FeedPage";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Login from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Signup from "./pages/Signup/Signup";

// for forget password page
import FindAccount from "./components/for_forget_pass/FindAccount/FindAccount";
import ResetPassword from "./components/for_forget_pass/ResetPassword/ResetPassword";
import Selection from "./components/for_forget_pass/Selection/Selection";
import Verification from "./components/for_forget_pass/Verification/Verification";

// verification for signup
import VerificationS from "./components/for_signup/Verification/Verification";

// internal components
import "./App.css";

const App = () => {
	// for forget-password start
	// getting user's account for forget-password
	const [foundAcc, setFoundAcc] = useState("");

	// getting selection option for forget-password
	const [selectedVia, setSelectedVia] = useState("");

	// checking otp is matching or not for forget-password
	const [isMatch, setIsMatch] = useState("");
	// for forget-password start

	// for sign-up start
	// for getting inputted email or phone
	const [getAddress, setAddress] = useState("");
	// for sign-up end

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<FeedPage />} />

					<Route path="profile" element={<ProfilePage />} />

					<Route path="sign-up" element={<Signup setAddress={setAddress} />} />

					<Route
						path="sign-up/verification"
						element={<VerificationS getAddress={getAddress} />}
					/>

					<Route path="log-in" element={<Login />} />

					<Route path="log-in/forget-password" element={<ForgetPassword />}>
						<Route
							path="find-account"
							element={<FindAccount setFoundAcc={setFoundAcc} />}
						/>

						<Route
							path="selection"
							element={
								foundAcc ? (
									<Selection
										foundAcc={foundAcc}
										selectedVia={selectedVia}
										setSelectedVia={setSelectedVia}
									/>
								) : (
									<Navigate to="../find-account" />
								)
							}
						/>

						<Route
							path="verification"
							element={
								foundAcc ? (
									<Verification
										selectedVia={selectedVia}
										setIsMatch={setIsMatch}
									/>
								) : (
									<Navigate to="../find-account" />
								)
							}
						/>

						<Route
							path="reset-password"
							element={
								isMatch ? (
									<ResetPassword isMatch={isMatch} />
								) : (
									<Navigate to="../find-account" />
								)
							}
						/>
					</Route>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	);
};

export default App;
