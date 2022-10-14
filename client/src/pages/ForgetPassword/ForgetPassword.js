// external components
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/for_forget_pass/Header/Header";

// internal components
import PreloaderWithoutAOS from "../../components/Preloader/PreloaderWithoutAOS";
import "./ForgetPassword.css";

const ForgetPassword = () => {
	// for waiting for preloader displaying start
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 700);
	}, []);
	// for waiting for preloader displaying end

	return (
		<>
			{isLoading ? (
				<PreloaderWithoutAOS />
			) : (
				<div className="container-fluid p-0">
					<div className="row m-0">
						<div className="col p-0">
							<Header />
							<Outlet />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ForgetPassword;
