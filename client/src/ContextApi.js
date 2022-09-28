// external components
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	// for getting current-user
	const [currentUser, setCurrentUser] = useState("");

	// for updating post when submitted
	const [updatePost, setUpdatePost] = useState("");

	return (
		<>
			<rootContext.Provider
				value={{ currentUser, setCurrentUser, updatePost, setUpdatePost }}
			>
				{children}
			</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
