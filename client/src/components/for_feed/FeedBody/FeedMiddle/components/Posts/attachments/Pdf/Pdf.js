import { Viewer, Worker } from "@react-pdf-viewer/core";
import "./Pdf.css";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// // Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const Pdf = ({ pdf }) => {
	//default plugin instance
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	// for water-mark
	const renderPage = (props) => (
		<>
			{props.canvasLayer.children}
			<div
				style={{
					alignItems: "center",
					display: "flex",
					height: "100%",
					justifyContent: "center",
					left: 0,
					position: "absolute",
					top: 0,
					width: "100%"
				}}
			>
				<div
					style={{
						color: "rgba(0, 0, 0, 0.2)",
						fontSize: `${8 * props.scale}rem`,
						fontWeight: "bold",
						textTransform: "uppercase",
						transform: "rotate(-45deg)",
						userSelect: "none"
					}}
				>
					ESOULMATE
				</div>
			</div>
			{props.annotationLayer.children}
			{props.textLayer.children}
		</>
	);

	return (
		<>
			<div className="pdf-container">
				<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
					<Viewer
						fileUrl={pdf}
						plugins={[defaultLayoutPluginInstance]}
						renderPage={renderPage}
					/>
				</Worker>
			</div>
		</>
	);
};

export default Pdf;
