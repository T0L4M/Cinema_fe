import React, { useContext, useEffect, useState } from "react";
import { Accordion, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";

function AdminLayout({ children }) {
	const { auth, alert, showAlert, logout } = useContext(DataContext);
	const [isActive, setIsActive] = useState(false);
	function toggleBacktotop() {
		setIsActive(window.scrollY > 100);
	}

	useEffect(() => {
		const onScroll = () => toggleBacktotop();
		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
			import("../css/admin.css");
		};
	}, []);
	return (
		<div id="wrapper">
			{/*Sidebar */}
			<ul
				className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
				id="accordionSidebar"
			>
				{/*Sidebar - Brand */}
				<div className="sidebar-brand-text mx-3 my-3">
					<Link className="text-white text-decoration-none" to={"/dashboard"}>
						<img
							src="/assets/image/tgv_logo.png"
							className="img-thumbnail"
							width="100"
							alt=""
						/>
						<span className="fs-5 ms-2">CINEMA</span>
					</Link>
				</div>

				{/*Divider */}
				<hr className="sidebar-divider my-0" />

				{/*Nav Item - Dashboard */}
				<li className="nav-item active">
					<Link className="nav-link" to={"/"}>
						<i className="fas fa-fw fa-tachometer-alt"></i>
						<span>To Homepage</span>
					</Link>
				</li>

				{/*Divider */}
				<hr className="sidebar-divider" />

				<Accordion defaultActiveKey={["0"]} alwaysOpen>
					<Accordion.Item eventKey="0" className="my-1 nav-item">
						<Accordion.Header>Components</Accordion.Header>
						<Accordion.Body>
							<div className="bg-white py-2 collapse-inner rounded">
								<Link className="collapse-item" to={"/admin/blog"}>
									<i class="fa-solid fa-newspaper me-2"></i>
									Blogs
								</Link>
								<Link className="collapse-item" to={"/admin/"}>
									<i class="fa-solid fa-user-group me-2"></i>
									Members
								</Link>
								<Link className="collapse-item" to={"/admin/movie"}>
									<i className="fa-solid fa-film me-2"></i>
									Movies
								</Link>
								<Link
									className="collapse-item"
									to={"/admin/auditoria"}
								>
									<i className="fa-solid fa-couch me-2"></i>
									Auditoriums
								</Link>
								<Link className="collapse-item" to={"/admin/hour"}>
									<i className="fa-solid fa-ticket me-2"></i>
									Hours
								</Link>
								<Link
									className="collapse-item"
									to={"/admin/showtime"}
								>
									<i className="fa-solid fa-clapperboard me-2"></i>
									Showtimes
								</Link>
								<Link
									className="collapse-item"
									to={"/admin/product"}
								>
									<i className="fa-solid fa-utensils me-2"></i>
									Products
								</Link>
							</div>
						</Accordion.Body>
					</Accordion.Item>

					<Accordion.Item eventKey="1" className="nav-item">
						<Accordion.Header>Sales</Accordion.Header>
						<Accordion.Body>
							<div className="bg-white py-2 collapse-inner rounded">
								<h6 className="collapse-header">Payments:</h6>
								<Link
									className="collapse-item"
									to={"/admin/payment"}
								>
									<i className="fa-solid fa-cash-register me-2"></i>
									Payments
								</Link>
							</div>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>

				{/*Divider */}
				<hr className="sidebar-divider d-none d-md-block" />
			</ul>
			{/*End of Sidebar */}

			{/*Content Wrapper */}
			<div id="content-wrapper" className="d-flex flex-column">
				{/*Main Content */}
				<div id="content">
					<Navbar expand="lg" className="bg-light">
						<Container fluid className="justify-content-end">
							{/* <Nav> */}
							<NavDropdown
								title={auth?.userName}
								id="basic-nav-dropdown"
								style={{ fontWeight: "bold" }}
							>
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
							{/* </Nav> */}
						</Container>
					</Navbar>
					{/*End of Topbar */}

					<div className="container" style={{ overflow: "auto" }}>
						{children}
					</div>
				</div>
				{/*End of Main Content */}

				{/*Footer */}
				<footer className="sticky-footer bg-white">
					<div className="container my-auto">
						<div className="copyright text-center my-auto">
							<span>Copyright &copy; FIN CINEMA 2023</span>
						</div>
					</div>
				</footer>
				{/*End of Footer */}
			</div>
			{/*End of Content Wrapper */}

			{/*Scroll to Top Button */}
			<Link
				className={`scroll-to-top rounded ${isActive ? "active" : ""}`}
				to="#page-top"
			>
				<i className="fas fa-angle-up"></i>
			</Link>
			{/*End of Page Wrapper */}
		</div>
	);
}

export default AdminLayout;
