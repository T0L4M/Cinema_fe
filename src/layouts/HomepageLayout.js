import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import { Container, Navbar, NavDropdown, Nav, Offcanvas } from "react-bootstrap";

const HomepageLayout = ({ children }) => {
	const [showButton, setShowButton] = useState(false);
	const { auth, logout } = useContext(DataContext);
	const [user, setUser] = useState(null);

	const switchLink = useCallback(() => {
		switch (auth?.role) {
			case "ADMIN":
				return (
					<Navbar.Text style={{ padding: "0" }}>
						<span className="d-inline-block">ADMIN:</span>
						<Link className="nav-link d-inline-block" to={"/dashboard"}>
							TO DASHBOARD
						</Link>
					</Navbar.Text>
				);
			case "USER":
				return (
					<NavDropdown
						id="navbarDropdown"
						title={auth?.userName}
						// menuVariant="dark"
						className="nav-item dropdown"
					>
						<NavDropdown.Item style={{ padding: "0" }}>
							<Link className="dropdown-item" to={"/personal"}>
								<i className="fas fa-user me-2"></i>
								PROFILE
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item style={{ padding: "0" }}>
							<Link className="dropdown-item" to={"/personal/history"}>
								<i className="fa-solid fa-clock-rotate-left me-2"></i>
								TRANSACTION
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item style={{ padding: "0" }}>
							<span
								className="ms-3"
								onClick={() => {
									if (
										window.confirm(
											"Are you sure you want to log out?"
										)
									) {
										logout();
									}
								}}
							>
								<i className="fas fa-sign-out me-2"></i>
								LOG OUT
							</span>
						</NavDropdown.Item>
					</NavDropdown>
				);
			default:
				return (
					<Navbar.Text style={{ padding: "0" }}>
						<Link className="nav-link fs-6" to={"/login"}>
							SIGN IN/ SIGN UP
						</Link>
					</Navbar.Text>
				);
		}
	}, [auth]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			import("../css/style.css");
			import("../css/global.css");
			window.removeEventListener("scroll", handleScroll);
			// switchLink();
		};
	}, []);
	const handleButtonClick = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<div className="container-fluid">
			<section
				id="top"
				style={{
					backgroundImage: "linear-gradient(#213363, #1B6B93)",
					border: "none",
				}}
			>
				<div className="container">
					<div className="row top_1">
						<div className="col-md-3">
							<div className="top_1l pt-1">
								<h3 className="mb-0">
									<Link
										className="text-white text-decoration-none"
										to={"/"}
									>
										<img
											src="/assets/image/fin_cinema.jpg"
											className="img-thumbnail"
											width="100"
											alt=""
										/>
										CINEMA
									</Link>
								</h3>
							</div>
						</div>

						<div className="col-md-9">
							<div className="top_1r text-end mt-3">
								<ul className="social-network social-circle mb-0">
									<li>
										<Link
											to={"#"}
											className="icoRss"
											title="Rss"
										>
											<i className="fa-brands fa-instagram"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoFacebook"
											title="Facebook"
										>
											<i className="fa-brands fa-facebook"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoTwitter"
											title="Twitter"
										>
											<i class="fa-brands fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoGoogle"
											title="Google +"
										>
											<i class="fa-brands fa-google"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoLinkedin"
											title="Linkedin"
										>
											<i class="fa-brands fa-linkedin"></i>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* End Header */}

			{/*START NAVBAR */}
			<section id="header">
				<Navbar
					expand="lg"
					style={{ backgroundImage: "linear-gradient( #1B6B93 , #4FC0D0)" }}
					sticky="top"
				>
					<Container>
						<Navbar.Brand>
							<Link
								className="navbar-brand text-white fw-bold text-decoration-none"
								to={"/"}
							>
								<img
									src="/"
									className="img-thumbnail me-2"
									width="100"
									alt=""
								/>
								CINEMA
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Offcanvas
							id="basic-navbar-nav"
							aria-labelledby="basic-navbar-nav"
							placement="end"
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id="basic-navbar-nav">
									<img
										src="/"
										className="img-thumbnail me-2"
										width="100"
										alt=""
									/>
									CINEMA
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className=" flex-grow-1 pe-3">
									<Navbar.Text style={{ padding: "0" }} k>
										<Link
											className="nav-link"
											saria-current="page"
											to={"/"}
										>
											<i className="fa-solid fa-house"></i>
										</Link>
									</Navbar.Text>

									<NavDropdown
										id="navbarDropdown"
										title="MOVIES"
										//   menuVariant="dark"
										className="nav-item dropdown"
									>
										<NavDropdown.Item
											style={{ padding: "0" }}
										>
											<Link
												className="dropdown-item"
												to={"/movies/showing"}
											>
												<i className="fa-solid fa-video me-2"></i>
												NOW SHOWING
											</Link>
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item
											style={{ padding: "0" }}
										>
											<Link
												className="dropdown-item"
												to={"/movies/coming"}
											>
												<i className="fa-solid fa-clapperboard me-2"></i>
												COMING SOON
											</Link>
										</NavDropdown.Item>
									</NavDropdown>
									<Navbar.Text style={{ padding: "0" }} k>
										<Link
											className="nav-link fs-6"
											to={"/showtimes"}
										>
											SHOWTIME
										</Link>
									</Navbar.Text>
									<Navbar.Text style={{ padding: "0" }} k>
										<Link
											className="nav-link fs-6"
											to={"/information"}
										>
											ABOUT US
										</Link>
									</Navbar.Text>
									<Navbar.Text style={{ padding: "0" }} k>
										<Link
											className="nav-link fs-6"
											to={"/contact"}
										>
											CONTACT US
										</Link>
									</Navbar.Text>
									{switchLink()}
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			</section>

			{/*START CONTENTING*/}
			<main
				className="content"
				style={{ backgroundImage: "linear-gradient(#4FC0D0, #FF9EAA)" }}
			>
				{children}
			</main>
			{/*END CONTENTING */}

			{/*START FOOTER */}
			<div
				className="container-fluid  footer py-5 fadeIn"
				style={{ backgroundImage: "linear-gradient(#FF9EAA,#73BBC9 )" }}
			>
				<div className="container py-5">
					<div className="row ">
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h4 className="title-footer mb-4">Our Cinema</h4>
							<p className="mb-2">
								<i
									className="fa fa-map-marker-alt  me-3"
									style={{ color: "#1B9C85" }}
								></i>
								391A Nam Kỳ Khởi Nghĩa, Ward 7, District 3, HCMC
							</p>

							<div className="top_1r mt-3">
								<ul className="social-network social-circle mb-0">
									<li>
										<Link
											to={"#"}
											className="icoRss"
											title="Rss"
										>
											<i className="fa-brands fa-instagram"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoFacebook"
											title="Facebook"
										>
											<i className="fa-brands fa-facebook"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoTwitter"
											title="Twitter"
										>
											<i class="fa-brands fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoGoogle"
											title="Google +"
										>
											<i class="fa-brands fa-google"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoLinkedin"
											title="Linkedin"
										>
											<i class="fa-brands fa-linkedin"></i>
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-4 col-md-4 col-sm-12">
							<h4 className="title-footer mb-4">Quick Links</h4>
							<Link className="btn btn-link" to={"/movie/showing"}>
								Now showing
							</Link>
							<Link className="btn btn-link" to={"/movie/coming"}>
								Coming soon
							</Link>
							<Link className="btn btn-link" to={"/aboutUs"}>
								About us
							</Link>
							<Link className="btn btn-link" to={"/contactUs"}>
								Contact us
							</Link>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h4 className="title-footer mb-4">Customer Care</h4>
							<div className="mb-4">
								<Link
									to={"tel:+012 345 67890"}
									className="me-5"
									style={{
										textDecoration: "none",
										color: "white",
									}}
								>
									<i
										className="fa fa-phone-alt  me-3"
										style={{ color: "#1B9C85" }}
									></i>
									Hotline
								</Link>
								<Link
									to={"mailto: fin_cinema@gmail.com"}
									style={{
										textDecoration: "none",
										color: "white",
									}}
								>
									<i
										className="fa fa-envelope  me-3"
										style={{ color: "#1B9C85" }}
									></i>
									Email
								</Link>
							</div>
							<p className="mb-1">Working hours:</p>
							<h6 className="text-light">
								8:00 - 22:00 <br /> (Including Holidays)
							</h6>
						</div>
					</div>
				</div>
			</div>
			{/*END FOOTER */}

			{/*BACK TO TOP */}
			{/* <Link
				id="myBtn"
				title="Go to top"
				onClick={() => {
					// Smooth scroll to top using window.scrollTo
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}
				className={`fa-solid fa-circle-up ${isActive ? "active" : ""}`}
			></Link> */}
			<button
				onClick={handleButtonClick}
				style={{ display: showButton ? "block" : "none" }}
				id="myBtn"
			>
				<i title="Go to top" class="fa-solid fa-circle-up"></i>
			</button>
		</div>
	);
};

export default HomepageLayout;
