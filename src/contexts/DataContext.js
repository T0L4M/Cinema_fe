import { createContext, useState } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
	const [alert, setAlert] = useState({ type: "", message: "", show: false });
	//ALERTING
	const showAlert = (type, message, duration = 3000) => {
		setAlert({ type, message, show: true });
		setTimeout(() => setAlert({ ...alert, show: false }), duration);
	};

	const hideAlert = () => setAlert({ ...alert, show: false });

	let valueProvide = {
		alert,
		showAlert,
		hideAlert,
	};
	return <DataContext.Provider value={valueProvide}>{children}</DataContext.Provider>;
}

export { DataContext, DataProvider };
