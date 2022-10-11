// external components
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	// for getting current-user
	const [currentUser, setCurrentUser] = useState("");

	// for updating profile when any changed
	const [updateProfile, setUpdateProfile] = useState("");

	return (
		<>
			<rootContext.Provider
				value={{ currentUser, setCurrentUser, updateProfile, setUpdateProfile }}
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
