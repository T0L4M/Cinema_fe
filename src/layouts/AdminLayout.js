import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminLayout({ children }) {
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
					<Link
						className="text-white text-decoration-none"
						to={"/admin.dashboard"}
					>
						<img src="/" className="img-thumbnail" width="100" alt="" />
						<span className="fs-5">CINEMA</span>
					</Link>
				</div>

				{/*Divider */}
				<hr className="sidebar-divider my-0" />

				{/*Nav Item - Dashboard */}
				<li className="nav-item active">
					<Link className="nav-link" to={"/home"}>
						<i className="fas fa-fw fa-tachometer-alt"></i>
						<span>To Homepage</span>
					</Link>
				</li>

				{/*Divider */}
				<hr className="sidebar-divider" />

				{/*Heading */}
				<div className="sidebar-heading">Interface</div>

				{/*
                        Nav Item - Pages Collapse Menu 

                        */}

				<Accordion defaultActiveKey={["0"]} alwaysOpen>
					<Accordion.Item eventKey="0" className="my-1 nav-item">
						<Accordion.Header>Components</Accordion.Header>
						<Accordion.Body>
							<div className="bg-white py-2 collapse-inner rounded">
								{/* <h6 className="collapse-header">Custom Tables:</h6> */}
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
								<Link className="collapse-item" to={"/admin.users"}>
									<i className="fa-solid fa-user me-2"></i>Users
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
									to={"/admin.payments"}
								>
									<i className="fa-solid fa-cash-register me-2"></i>
									Payments
								</Link>
								<h6 className="collapse-header">Feedbacks:</h6>
								<Link
									className="collapse-item"
									to={"/feedback.feedBack"}
								>
									<i className="fa-solid fa-comment me-2"></i>
									Feedbacks
								</Link>
							</div>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>

				{/*Divider */}
				<hr className="sidebar-divider" />

				{/*Nav Item - Charts */}
				<li className="nav-item">
					<Link className="nav-link" to={"/admin.dashboard"}>
						<i className="fas fa-fw fa-chart-area"></i>
						<span>Charts</span>
					</Link>
				</li>

				{/*Divider */}
				<hr className="sidebar-divider d-none d-md-block" />

				{/*Sidebar Toggler (Sidebar) */}
				<div className="text-center d-none d-md-inline">
					<button
						className="rounded-circle border-0"
						id="sidebarToggle"
					></button>
				</div>
			</ul>
			{/*End of Sidebar */}

			{/*Content Wrapper */}
			<div id="content-wrapper" className="d-flex flex-column">
				{/*Main Content */}
				<div id="content">
					{/* <nav
                                        className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow d-flex" style="justify-content: space-between"
                                  >
                                       Sidebar Toggle (Topbar)
                                        <button
                                              id="sidebarToggleTop"
                                              className="btn btn-link d-md-none rounded-circle mr-3"
                                        >
                                              <i className="fa fa-bars"></i>
                                        </button>
    
                                           Nav Item - User Information
                                              <li className="nav-item dropdown no-arrow ms-auto" style="">
                                                    <Link
                                                          className="nav-link dropdown-toggle"
                                                          to="#"
                                                          id="userDropdown"
                                                          role="button"
                                                          data-toggle="dropdown"
                                                          aria-haspopup="true"
                                                          aria-expanded="false"
                                                    >
                                                          <span
                                                                className="mr-2 d-none d-lg-inline text-gray-600 small"
                                                                >{{ session("userInfo")["name"] }}</span
                                                          >
                                                          <i className="fa-solid fa-ellipsis-vertical"></i>
                                                    </Link>
                                                  Dropdown - User Information
                                                    <div
                                                          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                                          aria-labelledby="userDropdown"
                                                    >
                                                          <Link
                                                                className="dropdown-item"
                                                                to="#"
                                                                data-toggle="modal"
                                                                data-target="#logoutModal"
                                                          >
                                                                <i
                                                                      className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                                                                ></i>
                                                                Logout
                                                          </Link>
                                                    </div>
                                              </li>
                                        </ul>
                                  </nav> */}
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
