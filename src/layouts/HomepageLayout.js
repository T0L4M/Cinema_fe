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
					<Navbar.Text
						className="d-flex align-items-center justify-content-end"
						style={{ flex: "0 1 auto" }}
					>
						<Link
							className="nav-link d-flex align-items-center"
							to={"/login"}
							style={{ fontSize: "0.85rem" }}
						>
							<i
								className="fa fa-user-circle me-2"
								style={{ fontSize: "0.85rem" }}
							></i>{" "}
							SIGN IN
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
		<div className="container-fluid" style={{ padding: "0" }}>
			<section id="header">
				<Navbar
					expand="lg"
					style={{
						backgroundImage: "linear-gradient( #202020 , #101010)",
						// backgroundColor: "transparent",
						height: "80px",
						// alignItems: "center",
					}}
				>
					<Container className="d-flex justify-content-around align-items-center">
						{/* Logo ở góc trái */}
						<Navbar.Brand
							className="d-flex align-items-center"
							style={{ flex: "0 1 auto" }}
						>
							<Link to={"/"}>
								<img
									src="/assets/image/tgv_logo.png"
									className="img-thumbnail me-2"
									width="150"
									height="auto"
									alt="Logo lớn"
									style={{
										backgroundColor: "transparent",
										border: "none",
										maxWidth: "150px",
									}}
								/>
							</Link>
						</Navbar.Brand>

						{/* <Container> */}
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Offcanvas
							id="basic-navbar-nav"
							aria-labelledby="basic-navbar-nav"
							placement="end"
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id="basic-navbar-nav">
									<img
										src="/assets/image/tgv_logo.png"
										className="img-thumbnail me-2"
										width="100"
										alt=""
									/>
									CINEMA
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav
									className="d-flex align-items-center justify-content-center mx-auto"
									style={{ flex: "1" }}
								>
									<Link
										className="nav-link d-flex align-items-center"
										to={"/"}
										style={{ fontSize: "0.85rem" }}
									>
										<i
											className="fa-solid fa-house"
											style={{
												fontSize: "1.2rem",
												marginRight: "5px",
											}}
										></i>
									</Link>

									<NavDropdown
										title={
											<span
												style={{
													fontSize: "0.85rem",
												}}
											>
												MOVIES
											</span>
										}
										className="d-flex align-items-center"
										style={{ fontSize: "0.85rem" }}
									>
										<Link
											className="dropdown-item"
											to={"/movies/showing"}
										>
											<i
												className="fa-solid fa-video me-2"
												style={{
													fontSize: "0.85rem",
												}}
											></i>{" "}
											NOW SHOWING
										</Link>
										<NavDropdown.Divider />
										<Link
											className="dropdown-item"
											to={"/movies/coming"}
										>
											<i
												className="fa-solid fa-clapperboard me-2"
												style={{
													fontSize: "0.85rem",
												}}
											></i>{" "}
											COMING SOON
										</Link>
									</NavDropdown>

									<Link
										className="nav-link"
										to={"/showtimes"}
										style={{ fontSize: "0.85rem" }}
									>
										SHOWTIME
									</Link>
									<Link
										className="nav-link"
										to={"/information"}
										style={{ fontSize: "0.85rem" }}
									>
										ABOUT US
									</Link>
									<Link
										className="nav-link"
										to={"/contact"}
										style={{ fontSize: "0.85rem" }}
									>
										CONTACT US
									</Link>
									<Link
										className="nav-link"
										to={"/blogs"}
										style={{ fontSize: "0.85rem" }}
									>
										BLOGS
									</Link>
								</Nav>
								{switchLink()}
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			</section>
			{/* End Header */}

			{/*START CONTENTING*/}
			<main
				className="content"
				style={{ backgroundImage: "linear-gradient(#480607,#202020 )" }}
			>
				{children}
			</main>
			{/*END CONTENTING */}

			{/*START FOOTER */}
			<div
				className="container-fluid footer py-5 fadeIn"
				style={{ backgroundImage: "linear-gradient( #202020 , #101010)" }}
			>
				<div className="container py-5">
					<div className="row ">
						<div className="col-lg-4 col-md-4 col-sm-12">
							<h4 className="title-footer mb-4">Our Cinema</h4>
							<p className="mb-2">
								<i
									className="fa fa-map-marker-alt me-3"
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
											<i className="fa-brands fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoGoogle"
											title="Google +"
										>
											<i className="fa-brands fa-google"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoLinkedin"
											title="Linkedin"
										>
											<i className="fa-brands fa-linkedin"></i>
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-4 col-md-4 col-sm-12">
							<h4 className="title-footer mb-4">Quick Links</h4>
							<Link className="btn btn-link" to={"/movies/showing"}>
								Now showing
							</Link>
							<Link className="btn btn-link" to={"/movies/coming"}>
								Coming soon
							</Link>
							<Link className="btn btn-link" to={"/infomation"}>
								About us
							</Link>
							<Link className="btn btn-link" to={"/contact"}>
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
										className="fa fa-phone-alt me-3"
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
										className="fa fa-envelope me-3"
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
