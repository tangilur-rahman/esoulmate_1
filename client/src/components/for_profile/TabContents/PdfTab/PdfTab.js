import "./PdfTab.css";

import Pdf from "./../../../for_feed/FeedBody/FeedMiddle/components/Posts/attachments/Pdf/Pdf";

import pdf from "./../../../../dummy-data/pdf.json";

const PdfTab = () => {
	return (
		<>
			<div className="pdf-tab-container">
				<h5>Pdf</h5>
				<div className="pdf row row-cols-auto">
					{pdf &&
						pdf.map((value, index) => {
							return (
								<div key={index}>
									<Pdf pdf={value.pdf} />
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default PdfTab;
