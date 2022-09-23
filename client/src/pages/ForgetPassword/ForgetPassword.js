// external components
import { Outlet } from "react-router-dom";
import Header from "../../components/for_forget_pass/Header/Header";

// internal components
import "./ForgetPassword.css";

const ForgetPassword = () => {
	return (
		<>
			<div className="container-fluid p-0">
				<div className="row m-0">
					<div className="col p-0">
						<Header />
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgetPassword;
