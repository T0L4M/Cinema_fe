import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DataContext = createContext();

function DataProvider({ children }) {
	const navigate = useNavigate();
	const [alert, setAlert] = useState({ type: "", message: "", show: false });
	//USER
	let user = JSON.parse(localStorage.getItem("user")) || {};
	const [auth, setAuth] = useState(user);
	//ALERTING
	const showAlert = (type, message, duration = 3000) => {
		setAlert({ type, message, show: true });
		setTimeout(() => setAlert({ ...alert, show: false }), duration);
	};

	const hideAlert = () => setAlert({ ...alert, show: false });

	//LOGIN
	const login = async (u) => {
		const parseUser = jwtDecode(u);
		localStorage.setItem("user", JSON.stringify(parseUser.UserInfo));
		setAuth(parseUser.UserInfo);
		if (parseUser.UserInfo.role == "ADMIN") {
			showAlert("success", "Login Successfully!");
			navigate("/dashboard");
		} else if (parseUser.UserInfo.role == "USER") {
			showAlert("success", "Login Successfully!");
			navigate(-1);
		}
	};

	//LOG OUT
	const logout = () => {
		localStorage.removeItem("user");
		showAlert("success", "Logged out successfully!");
		navigate("/");
	};

	let valueProvide = {
		alert,
		showAlert,
		hideAlert,
		auth,
		setAuth,
		login,
		logout,
	};
	return <DataContext.Provider value={valueProvide}>{children}</DataContext.Provider>;
}

export { DataContext, DataProvider };
