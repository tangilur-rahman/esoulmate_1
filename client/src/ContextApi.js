// external components
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	// for getting current-user
	const [currentUser, setCurrentUser] = useState("");

	return (
		<>
			<rootContext.Provider value={{ currentUser, setCurrentUser }}>
				{children}
			</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
