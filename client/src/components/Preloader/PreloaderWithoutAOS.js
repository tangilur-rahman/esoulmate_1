// internal components
import "./Preloader.css";

const Preloader = () => {
	return (
		<>
			<div className="container-fluid p-0">
				<div className="row m-0 preloader-container">
					<div className="col p-0 preloader-wrapper">
						<div className="preloader">
							<img src="/assets/logo/esoulmate-logo.png" alt="esolumate-icon" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Preloader;
