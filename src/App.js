import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomepageLayout from "./layouts/HomepageLayout";
import { privateRouter, publicRouter } from "./configs/routerConfig";
import AdminLayout from "./layouts/AdminLayout";
import { DataContext } from "./contexts/DataContext";
import { useContext } from "react";

function App() {
	const { auth, showAlert } = useContext(DataContext);
	return (
		<div>
			<Routes>
				{publicRouter.map((item, index) => {
					return (
						<Route
							key={index}
							path={item.path}
							element={<HomepageLayout>{item.element}</HomepageLayout>}
						/>
					);
				})}
				{privateRouter.map((item, index) => {
					if (item.roles.includes(auth?.role)) {
						if (auth?.role == "ADMIN") {
							return (
								<Route
									key={index}
									path={item.path}
									element={
										<AdminLayout>
											{item.element}
										</AdminLayout>
									}
								/>
							);
						} else if (auth?.role == "USER") {
							return (
								<Route
									key={index}
									path={item.path}
									element={
										<HomepageLayout>
											{item.element}
										</HomepageLayout>
									}
								/>
							);
						}
					} else {
						// showAlert("warning", "Please Log In to continue!");
						return (
							<Route
								key={index}
								path="*"
								element={<Navigate to="./login" />}
							/>
						);
					}
				})}
			</Routes>
		</div>
	);
}

export default App;
