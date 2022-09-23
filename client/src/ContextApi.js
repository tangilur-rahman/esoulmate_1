// external components
import { createContext, useContext } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	return (
		<>
			<rootContext.Provider value={{}}>{children}</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
