// external components
import { useState } from "react";

// internal components
import "./AboutTab.css";
import AboutYou from "./AboutYou/AboutYou";
import ContactBasicInfo from "./ContactBasicInfo/ContactBasicInfo";
import Location from "./Location/Location";
import WorkEducation from "./WorkEducation/WorkEducation";

const AboutTab = ({ getProfile }) => {
	// for getting selected tab
	const [selectedTab, setSelectedTab] = useState("Work & Education");

	return (
		<>
			<div className="row m-0 about-tab-container">
				{/* left-about-container start  */}
				<div className="col-lg-3 col-12 p-0 ">
					<div className="left-about-con">
						<h4>About</h4>
						<ul>
							<li
								id={selectedTab === "Work & Education" ? "active" : ""}
								onClick={() => setSelectedTab("Work & Education")}
							>
								Work & Education
							</li>
							<li
								id={selectedTab === "Location" ? "active" : ""}
								onClick={() => setSelectedTab("Location")}
							>
								Location
							</li>
							<li
								id={selectedTab === "Contact & Basic info" ? "active" : ""}
								onClick={() => setSelectedTab("Contact & Basic info")}
							>
								Contact & Basic info
							</li>
							<li
								id={selectedTab === "Details about you" ? "active" : ""}
								onClick={() => setSelectedTab("Details about you")}
							>
								Details about you
							</li>
						</ul>
					</div>
				</div>
				{/* left-about-container end  */}

				{/* right-about-container start  */}
				<div className="col-lg-8 col-12 p-0 right-about-con">
					{selectedTab === "Work & Education" && (
						<WorkEducation getProfile={getProfile} />
					)}

					{selectedTab === "Location" && <Location getProfile={getProfile} />}

					{selectedTab === "Contact & Basic info" && (
						<ContactBasicInfo getProfile={getProfile} />
					)}

					{selectedTab === "Details about you" && (
						<AboutYou getProfile={getProfile} />
					)}
				</div>
				{/* right-about-container end  */}
			</div>
		</>
	);
};

export default AboutTab;
