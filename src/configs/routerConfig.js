import AuditoriaForm from "../pages/adminPage/auditorias/AuditoriaForm";
import AuditoriaList from "../pages/adminPage/auditorias/AuditoriaList";
import DashboardPage from "../pages/adminPage/DashboardPage";
import MovieForm from "../pages/adminPage/movies/MovieForm";
import MovieList from "../pages/adminPage/movies/MovieList";
import HomePage from "../pages/homePage/HomePage";

const publicRouter = [
	{
		path: "/",
		element: <HomePage />,
	},
];

const privateRouter = [
	{
		path: "/dashboard",
		element: <DashboardPage />,
		roles: ["Admin"],
	},
	{
		path: "/admin/auditoria",
		element: <AuditoriaList />,
		roles: ["Admin"],
	},
	{
		path: "/admin/auditoria/new/:id?",
		element: <AuditoriaForm />,
		roles: ["Admin"],
	},
	{
		path: "/admin/movie",
		element: <MovieList />,
		roles: ["Admin"],
	},
	{
		path: "/admin/movie/new/:id?",
		element: <MovieForm />,
		roles: ["Admin"],
	},
];

export { publicRouter, privateRouter };
