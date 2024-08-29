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
import RegisterPage from "../pages/homePage/users/RegisterPage";
import UserLoginPage from "../pages/homePage/users/UserLoginPage";
import ContactUs from "../pages/homePage/ContactUs";
import AboutUs from "../pages/homePage/AboutUs";
import CheckOut1 from "../pages/homePage/bookings/CheckOut1";
import CheckOTPPage from "../pages/homePage/users/fogotpassword/CheckOTPPage";
import ForgotPasswordPage from "../pages/homePage/users/fogotpassword/ForgotPasswordPage";

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
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/login",
		element: <UserLoginPage />,
	},
	{
		path: "/contact",
		element: <ContactUs />,
	},
	{
		path: "/information",
		element: <AboutUs />,
	},
	{
		path: "/checkotp",
		element: <CheckOTPPage />,
	},
	{
		path: "/forgotpassword",
		element: <ForgotPasswordPage />,
	},
];

const privateRouter = [
	{
		path: "/dashboard",
		element: <DashboardPage />,
		roles: ["ADMIN"],
	},
	//Auditoria
	{
		path: "/admin/auditoria",
		element: <AuditoriaList />,
		roles: ["ADMIN"],
	},
	{
		path: "/admin/auditoria/new/:id?",
		element: <AuditoriaForm />,
		roles: ["ADMIN"],
	},
	{
		path: "/admin/auditoria/detail/:id?",
		element: <AuditoriaDetail />,
		roles: ["ADMIN"],
	},
	//Hour
	{
		path: "/admin/hour",
		element: <HourList />,
		roles: ["ADMIN"],
	},
	{
		path: "/admin/hour/new/:id?",
		element: <HourForm />,
		roles: ["ADMIN"],
	},

	//Movie
	{
		path: "/admin/movie",
		element: <MovieList />,
		roles: ["ADMIN"],
	},
	{
		path: "/admin/movie/new/:id?",
		element: <MovieForm />,
		roles: ["ADMIN"],
	},
	//Showtime
	{
		path: "/admin/showtime",
		element: <ShowtimeList />,
		roles: ["ADMIN"],
	},
	{
		path: "/admin/showtime/new/:id?",
		element: <ShowtimeForm />,
		roles: ["ADMIN"],
	},
	//Product
	{
		path: "/admin/product",
		element: <ProductList />,
		roles: ["ADMIN"],
	},
	{
		path: "/admin/product/new/:id?",
		element: <ProductForm />,
		roles: ["ADMIN"],
	},

	//Booking
	{
		path: "/booking/:idShowtime?",
		element: <CheckOut1 />,
		roles: ["USER", "ADMIN"],
	},
];

export { publicRouter, privateRouter };
