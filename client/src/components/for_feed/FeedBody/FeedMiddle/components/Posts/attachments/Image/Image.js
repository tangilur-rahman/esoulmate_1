// external components
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// internal components
import "./Image.css";

const Image = ({ image }) => {
	return (
		<>
			<div className="img-container">
				{image.length < 3 && (
					<PhotoProvider>
						{image.length > 0 &&
							image.map((value, index) => {
								return (
									<PhotoView key={index} src={`/uploads/attachments/${value}`}>
										{
											<img
												src={`/uploads/attachments/${value}`}
												alt="post-img"
												className="img-fluid"
												id={
													(index === 0 ? "single-image" : "") ||
													(index === 1 ? "double-images" : "")
												}
											/>
										}
									</PhotoView>
								);
							})}
					</PhotoProvider>
				)}

				{image.length === 3 && (
					<div className="when-third-images">
						<PhotoProvider>
							{image.map((value, index) => {
								return (
									<PhotoView key={index} src={`/uploads/attachments/${value}`}>
										{
											<img
												src={`/uploads/attachments/${value}`}
												alt="post-img"
												className="img-fluid"
												id={
													(index === 0 ? "first-image" : "") ||
													(index === 1 ? "second-image" : "") ||
													(index === 2 ? "third-image" : "")
												}
											/>
										}
									</PhotoView>
								);
							})}
						</PhotoProvider>
					</div>
				)}

				{image.length >= 4 && (
					<div className="when-forth-images">
						<PhotoProvider>
							{image.map((value, index) => {
								return (
									<PhotoView key={index} src={`/uploads/attachments/${value}`}>
										{index <= 3 && (
											<img
												src={`/uploads/attachments/${value}`}
												alt="post-img"
												className={
													index === 3 && image.length > 4 ? "when-counter" : ""
												}
												id={
													(index === 0 ? "first-image" : "") ||
													(index === 1 ? "second-image" : "") ||
													(index === 2 ? "third-image" : "") ||
													(index === 3 ? "forth-image" : "")
												}
											/>
										)}
									</PhotoView>
								);
							})}
						</PhotoProvider>

						{image.length > 4 && <h5 id="counter">{`+${image.length - 4}`}</h5>}
					</div>
				)}
			</div>
		</>
	);
};

export default Image;
