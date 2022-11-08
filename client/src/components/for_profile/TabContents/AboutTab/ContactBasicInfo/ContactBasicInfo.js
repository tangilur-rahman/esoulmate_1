// external components

// internal components
import BasicInfo from "./BasicInfo/BasicInfo";
import "./ContactBasicInfo.css";
import ContactInfo from "./ContactInfo/ContactInfo";

const ContactBasicInfo = ({ getProfile }) => {
	return (
		<>
			<div className="contact-basic-info-container">
				<ContactInfo getProfile={getProfile} />
				<BasicInfo getProfile={getProfile} />
			</div>
		</>
	);
};

export default ContactBasicInfo;
