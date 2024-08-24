import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomepageLayout = ({ children }) => {
	const [isActive, setIsActive] = useState(false);
	function toggleBacktotop() {
		setIsActive(window.scrollY > 100);
	}

	useEffect(() => {
		const onScroll = () => toggleBacktotop();
		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
			import("../css/style.css");
			import("../css/global.css");
		};
	}, []);
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
										to={"/home"}
									>
										<img
											src="/"
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
											<i className="fa fa-instagram"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoFacebook"
											title="Facebook"
										>
											<i className="fa fa-facebook"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoTwitter"
											title="Twitter"
										>
											<i className="fa fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoGoogle"
											title="Google +"
										>
											<i className="fa fa-youtube"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoLinkedin"
											title="Linkedin"
										>
											<i className="fa fa-linkedin"></i>
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
				<nav
					className="navbar navbar-expand-md "
					style={{ backgroundImage: "linear-gradient( #1B6B93 , #4FC0D0)" }}
					id="navbar_sticky"
				>
					<div className="container">
						<Link
							className="navbar-brand text-white fw-bold text-decoration-none"
							to={"/home"}
						>
							<img
								src="/"
								className="img-thumbnail me-2"
								width="100"
								alt=""
							/>
							CINEMA
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse text-dark"
							style={{ fontFamily: "Mitr" }}
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav mb-0">
								<li className="nav-item">
									<Link
										className="nav-link"
										saria-current="page"
										to={"/home"}
									>
										<i className="fa-solid fa-house"></i>
									</Link>
								</li>

								<li className="nav-item dropdown">
									<Link
										className="nav-link dropdown-toggle fs-6"
										to={"#"}
										id="navbarDropdown"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										MOVIES
									</Link>
									<ul
										className="dropdown-menu drop_1"
										aria-labelledby="navbarDropdown"
									>
										<li>
											<Link
												className="dropdown-item"
												to={"/movie.showing"}
											>
												<i className="fa-solid fa-video me-2"></i>
												NOW SHOWING
											</Link>
										</li>
										<li>
											<Link
												className="dropdown-item border-0"
												to={"/movie.coming"}
											>
												<i className="fa-solid fa-clapperboard me-2"></i>
												COMING SOON
											</Link>
										</li>
									</ul>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link fs-6"
										to={"/showtimes"}
									>
										SHOWTIME
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link fs-6" to={"/abus"}>
										ABOUT US
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link fs-6"
										to={"/contact_us"}
									>
										CONTACT US
									</Link>
								</li>
								{/* @if (session("userInfo"))
                          @switch(session('userInfo')['role'])
                          @case(1)
                              <li className="nav-item">
                                  <span className="d-inline-block">ADMIN:</span>
                                  <a className="nav-link d-inline-block" href="{{ route('admin.dashboard') }}">TO DASHBOARD</a>
                              </li>
                          @break
            
                          @case(0)
                          <li className="nav-item dropdown">
                            <a 
                            href="#" 
                            className="nav-link dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                            id="navbarDropdown2"
                            role="button"
                            aria-expanded="false"
                                                            >
                                                                  <span>{{ session("userInfo")["name"] }}</span>
                                                            </a>
                                                            <!-- Dropdown - User Information -->
                                                            <ul
                                                                  className="dropdown-menu drop_1"
                              aria-labelledby="navbarDropdown2"
                                                            >
                                                                  <li>
                                                                    <a className="dropdown-item" href="{{ route("user.detail",session("userInfo")["user_id"]) }}">
                                                                          <i
                                                                                className="fas fa-user"
                                                                          ></i>
                                                                          PROFILE
                                                                    </a>
                                                                  </li>
                              <li>
                                <a className="dropdown-item" href="{{ route("user.histories",session("userInfo")["user_id"]) }}">
                                  <i className="fa-solid fa-clock-rotate-left"></i>
                                  TRANSACTION HISTORY
                                </a>
                              </li>
                                                                  <li>
                                                                    <a
                                                                          className="dropdown-item"
                                                                          href="{{ route("user.logout") }}"
                                                                          data-toggle="modal"
                                                                          data-target="#logoutModal"
                                  onclick="return confirm('Log out from the website')"
                                                                    >
                                                                          <i
                                                                                className="fas fa-sign-out-alt "
                                                                          ></i>
                                                                          LOG OUT
                                                                    </a>
                                                                  </li>
                                                            </ul>
                                                      </li>
                          @break
            
                          @case(2)
                              <li className="nav-item">
                                  <span className="d-inline-block fs-4">Welcome:</span>
                                  <a className="nav-link d-inline-block" href="{{ route('movies.nhanvien') }}">
                                      {{ session('userInfo')['name'] }}</a>
                              </li>
                          @break
            
                          @default
                            
                      @endswitch
                            
                          @else
                              <li className="nav-item">
                            <a className="nav-link fs-6" href="{{ route("login") }}"
                                                                        >SIGN IN/ SIGN UP</a
                                                                  >
                          </li>
                          @endif 
                           */}
							</ul>
						</div>
					</div>
				</nav>
			</section>
			{/* END NAVBAR*/}

			{/* @if (session("success"))
                <div className="alert alert-success alert-dismissible fade show mb-0">
                  <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                  <strong>Success!</strong> {{ session("success") }}.
                </div>
                @endif
                @if (session("error"))
                  <div className="alert alert-danger alert-dismissible fade show mb-0">
                      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                      <strong>Error!</strong> {{session('error')}}.
                    </div>
                  @endif */}

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
				className="container-fluid  footer py-5 wow fadeIn"
				style={{ backgroundImage: "linear-gradient(#FF9EAA,#73BBC9 )" }}
				data-wow-delay="0.1s"
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
											<i className="fa fa-instagram"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoFacebook"
											title="Facebook"
										>
											<i className="fa fa-facebook"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoTwitter"
											title="Twitter"
										>
											<i className="fa fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoGoogle"
											title="Google +"
										>
											<i className="fa fa-youtube"></i>
										</Link>
									</li>
									<li>
										<Link
											to={"#"}
											className="icoLinkedin"
											title="Linkedin"
										>
											<i className="fa fa-linkedin"></i>
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-4 col-md-4 col-sm-12">
							<h4 className="title-footer mb-4">Quick Links</h4>
							<Link className="btn btn-link" to={"/movie.showing"}>
								Now showing
							</Link>
							<Link className="btn btn-link" to={"/movie.coming"}>
								Coming soon
							</Link>
							<Link className="btn btn-link" to={"/abus"}>
								About us
							</Link>
							<Link className="btn btn-link" to={"/contact_us"}>
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
			<Link
				id="myBtn"
				title="Go to top"
				onClick={() => {
					// Smooth scroll to top using window.scrollTo
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}
				className={`fa-solid fa-circle-up ${isActive ? "active" : ""}`}
			></Link>
		</div>
	);
};

export default HomepageLayout;
