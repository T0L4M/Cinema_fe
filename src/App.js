import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomepageLayout from "./layouts/HomepageLayout";
import { privateRouter, publicRouter } from "./configs/routerConfig";
import AdminLayout from "./layouts/AdminLayout";

function App() {
	// const { auth } = useContext(DataContext);
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
					// if (item.roles.includes(auth?.role)) {
					return (
						<Route
							key={index}
							path={item.path}
							element={<AdminLayout>{item.element}</AdminLayout>}
						/>
					);
					// } else {
					// 	return (
					// 		<Route
					// 			key={index}
					// 			path="*"
					// 			element={<Navigate to="./" />}
					// 		/>
					// 	);
					// }
				})}
			</Routes>
		</div>
	);
}

export default App;
