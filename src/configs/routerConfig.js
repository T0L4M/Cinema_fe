import AuditoriaDetail from "../pages/adminPage/auditorias/AuditoriaDetail";
import AuditoriaForm from "../pages/adminPage/auditorias/AuditoriaForm";
import AuditoriaList from "../pages/adminPage/auditorias/AuditoriaList";
import DashboardPage from "../pages/adminPage/DashboardPage";
import HourList from "../pages/adminPage/hours/HourList";
import HourForm from "../pages/adminPage/hours/HourForm";
import MovieForm from "../pages/adminPage/movies/MovieForm";
import MovieList from "../pages/adminPage/movies/MovieList";
import ShowtimeForm from "../pages/adminPage/showtimes/ShowtimeForm";
import ShowtimeList from "../pages/adminPage/showtimes/ShowtimeList";
import HomePage from "../pages/homePage/HomePage";
import ShowtimePage from "../pages/homePage/showtimes/ShowtimePage";
import ProductList from "../pages/adminPage/products/ProductList";
import ProductForm from "../pages/adminPage/products/ProductForm";
import MoviePage from "../pages/homePage/movies/MoviePage";

const publicRouter = [
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/showtimes",
		element: <ShowtimePage />,
	},
	{
		path: "/movies/:status?",
		element: <MoviePage />,
	},
];

const privateRouter = [
	{
		path: "/dashboard",
		element: <DashboardPage />,
		roles: ["Admin"],
	},
	//Auditoria
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
		path: "/admin/auditoria/detail/:id?",
		element: <AuditoriaDetail />,
		roles: ["Admin"],
	},
	//Hour
	{
		path: "/admin/hour",
		element: <HourList />,
		roles: ["Admin"],
	},
	{
		path: "/admin/hour/new/:id?",
		element: <HourForm />,
		roles: ["Admin"],
	},

	//Movie
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
	//Showtime
	{
		path: "/admin/showtime",
		element: <ShowtimeList />,
		roles: ["Admin"],
	},
	{
		path: "/admin/showtime/new/:id?",
		element: <ShowtimeForm />,
		roles: ["Admin"],
	},
	//Product
	{
		path: "/admin/product",
		element: <ProductList />,
		roles: ["Admin"],
	},
	{
		path: "/admin/product/new/:id?",
		element: <ProductForm />,
		roles: ["Admin"],
	},
];

export { publicRouter, privateRouter };
