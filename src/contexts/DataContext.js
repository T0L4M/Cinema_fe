import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DataContext = createContext();

function DataProvider({ children }) {
	const navigate = useNavigate();
	const [alert, setAlert] = useState({ type: "", message: "", show: false });
	//USER
	let user = JSON.parse(sessionStorage.getItem("user")) || {};
	const [auth, setAuth] = useState(user);
	//BOOKING
	let book = JSON.parse(sessionStorage.getItem("booking")) || {};
	const [bookAuth, setBookAuth] = useState(book);
	//ORDER
	let order = JSON.parse(sessionStorage.getItem("order")) || {};
	const [orderAuth, setOrderAuth] = useState(order);
	//ALERTING
	const showAlert = (type, message, duration = 1000) => {
		setAlert({ type, message, show: true });
		setTimeout(() => setAlert({ ...alert, show: false }), duration);
	};

	const hideAlert = () => setAlert({ ...alert, show: false });

	//LOGIN
	const login = async (u) => {
		const parseUser = jwtDecode(u);
		sessionStorage.setItem("user", JSON.stringify(parseUser.UserInfo));
		setAuth(parseUser.UserInfo);
		if (parseUser.UserInfo.role == "ADMIN") {
			showAlert("success", "Login Successfully!");
			navigate("/dashboard");
		} else if (parseUser.UserInfo.role == "USER") {
			showAlert("success", "Login Successfully!");
			navigate("/");
		}
	};

	//LOG OUT
	const logout = () => {
		sessionStorage.removeItem("user");
		setAuth({});
		showAlert("success", "Logged out successfully!");
		navigate("/");
	};

	//Save Booking
	const bookingSaving = (c) => {
		sessionStorage.setItem("booking", JSON.stringify(c));
		setBookAuth(c);
		navigate("/checkout");
	};
	//Delete Booking
	const bookingDelete = () => {
		sessionStorage.removeItem("booking");
		setBookAuth(null);
		// showAlert("success", "Logged out successfully!");
		navigate("/showtimes");
	};
	//Save Order
	const orderSaving = (o) => {
		sessionStorage.setItem("order", JSON.stringify(o));
		setOrderAuth(o);
	};
	//Delete Order
	const orderDelete = () => {
		sessionStorage.removeItem("order");
		setOrderAuth(null);
		// showAlert("success", "Logged out successfully!");
		// navigate("/showtimes");
	};

	let valueProvide = {
		alert,
		showAlert,
		hideAlert,
		auth,
		setAuth,
		login,
		logout,
		bookingSaving,
		bookAuth,
		bookingDelete,
		orderSaving,
		orderAuth,
		orderDelete,
	};
	return <DataContext.Provider value={valueProvide}>{children}</DataContext.Provider>;
}

export { DataContext, DataProvider };
