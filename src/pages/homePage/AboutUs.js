import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs(props) {
	useEffect(() => {
		AOS.init({
			duration: 1200,
		});
	}, []);
	return (
		<>
			<div className="about_pgm">
				<div className="container-xl">
					<div className="row about_pg1">
						<div className="col-md-12">
							<h2 data-aos="fade-down">
								<span className="col_red">We Are FIN Cinema</span>
								<br />
								Providing Cinema System Services
							</h2>
							<div data-aos="flip-down">
								<p className="mt-3 w-50">
									Providing you with the most actionable Movie
									Production Services. Planis creates and
									distribute Video Content.
								</p>
								<p className="w-50">
									Your one-stop shop for all things cinema. We
									offer a wide variety of films to choose from,
									including the latest blockbusters, indie gems,
									and classic favorites. We also have a variety
									of amenities to make your movie-going
									experience even more enjoyable, such as
									comfortable seating, state-of-the-art sound
									systems, and concession stands.
								</p>
								<p className="w-50">
									We hope you enjoy your time at FIN Cinema.
									We're here to make your movie-going experience
									unforgettable.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className="container-xl"
				style={{
					fontFamily: "'Mitr', sans-serif",
					backgroundImage: "linear-gradient(#4FC0D0,#FF9EAA)",
				}}
			>
				<div className="row trend_1">
					<div className="col-md-12">
						<div className="trend_1l">
							<h4 className="mb-0">
								<i className="fa fa-youtube-play align-middle col_red me-1"></i>{" "}
								Meet <span className="col_red">The Team</span>
							</h4>
						</div>
					</div>
				</div>
				<div className="row my-5">
					{/* Team Member 1 */}
					<div className="col-sm-6 team-7 col-lg-3 col-12" data-aos="zoom-in">
						<div id="avartar" className="position-absolute">
							<img
								className="img-thumbnail"
								src="/assets/image/abus_Lam.jpg"
								alt=""
							/>
						</div>
						<div id="avartar-inf">
							<div className="inf">
								<div>
									<h6>LE QUANG LAM</h6>
									<p>Student1429103</p>
									<p>TEAM LEADER</p>
									<ul className="ms-4">
										<li>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* Team Member 2 */}
					<div className="col-sm-6 team-7 col-lg-3 col-12" data-aos="zoom-in">
						<div id="avartar" className="position-absolute">
							<img
								className="img-thumbnail"
								src="/assets/image/abus_Khang.jpg"
								alt=""
							/>
						</div>
						<div id="avartar-inf">
							<div className="inf">
								<div>
									<h6>NGO NGUYEN DUY KHANG</h6>
									<p>Student1429108</p>
									<p>TEAM MEMBER</p>
									<ul className="ms-4">
										<li>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* Team Member 3 */}
					<div className="col-sm-6 team-7 col-lg-3 col-12" data-aos="zoom-in">
						<div id="avartar" className="position-absolute">
							<img
								className="img-thumbnail"
								src="/assets/image/abus_Hoang.jpg"
								alt=""
							/>
						</div>
						<div id="avartar-inf">
							<div className="inf">
								<div>
									<h6>LE HUY HOANG</h6>
									<p>Student1425325</p>
									<p>TEAM MEMBER</p>
									<ul className="ms-4">
										<li>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* Team Member 4 */}
					<div className="col-sm-6 team-7 col-lg-3 col-12" data-aos="zoom-in">
						<div id="avartar" className="position-absolute">
							<img
								className="img-thumbnail"
								src="/assets/image/abus_My.jpg"
								alt=""
							/>
						</div>
						<div id="avartar-inf">
							<div className="inf">
								<div>
									<h6>PHAM THI DIEM MY</h6>
									<p>Student1429119</p>
									<p>TEAM MEMBER</p>
									<ul className="ms-4">
										<li>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AboutUs;
