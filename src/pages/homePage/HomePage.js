import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Carousel, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const style = {
	reviewSection: {
		padding: "20px 0",
		backgroundColor: "linear-gradient(to bottom, #111111, #480607, #202020)",
		color: "#fff",
	},
	container: {
		display: "flex",
		maxWidth: "1200px",
		margin: "0 auto",
		gap: "20px",
	},
	leftImage: {
		flex: 2,
		borderRadius: "10px",
		overflow: "hidden",
		height: "400px", // Set a fixed height
	},
	rightReviews: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		gap: "10px", // Add gap between review items
	},
	largeImage: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
	reviewRow: {
		display: "flex",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: "10px",
		overflow: "hidden",
		height: "120px", // Set a fixed height for each review item
	},
	smallImage: {
		width: "40%",
		height: "100%",
		objectFit: "cover",
	},
	reviewContent: {
		flex: 1,
		padding: "10px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	reviewTitle: {
		fontSize: "14px",
		fontWeight: "bold",
		margin: "0",
		lineHeight: "1.2",
	},
	reviewLink: {
		color: "#fff",
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline",
		},
	},
	reviewMeta: {
		fontSize: "12px",
		color: "#ccc",
	},
	likeView: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	likeButton: {
		backgroundColor: "#4267B2",
		color: "white",
		border: "none",
		padding: "2px 8px",
		borderRadius: "3px",
		fontSize: "12px",
	},
};

function HomePage(props) {
	const [data, setData] = useState([]);
	const [review, setReview] = useState([]);
	const { auth, alert, hideAlert } = useContext(DataContext);
	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/movies");
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	const fetchBlogs = async () => {
		try {
			const response = await axios.get("http://localhost:8080/blogs/status");
			setReview(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	const updateShowtimeStatus = async () => {
		try {
			const response = await axios.put("http://localhost:8080/showtimes/modify_status");
			console.log(`There are ${response.data.data.length} showtime updated!`);
		} catch (error) {
			console.log("Error Update Showtime Status: ", error);
		}
	};

	useEffect(() => {
		document.title = "TGV CINEMA || Homepage";
		AOS.init({
			duration: 1200,
		});
		fetchData();
		updateShowtimeStatus();
		fetchBlogs();
	}, []);

	return (
		<div
			style={{
				background:
					"linear-gradient(to bottom, #111111, #111111, #480607, #480607, #480607,#480607, #111111)",
			}}
		>
			{alert.type != "" && (
				<Alert
					variant={alert.type}
					onClose={hideAlert}
					dismissible
					transition
					className="position-fixed bottom-0 end-0"
					style={{ width: "fit-content", zIndex: 9999 }}
				>
					{alert.message}
				</Alert>
			)}
			<section id="center" className="center_home">
				<Carousel touch wrap fade>
					<Carousel.Item>
						<img
							src="/assets/image/Transformers.jpg"
							className="d-block w-100"
							alt="Transformers"
						/>

						<Carousel.Caption>
							<div className="animated zoomIn d-none d-md-block">
								<h1 className="font_60">Transformers</h1>
								<p className="mt-3">
									The home world of Maximal, an advanced race of
									Transformers with beast modes, is attacked by
									the planet-eating dark god Unicron. The
									Terrorcon faction, messengers of Unicron led
									by Scourge, seek to obtain for their master
									the greatest piece of technology of the
									Maximal race, the Key of Spacetime, which can
									open portals through space and time to
									planets. other crystals.
								</p>
								<p className="mb-2">
									<span className="col_red me-1 fw-bold">
										Premiere:
									</span>
									09/09/2024
								</p>
								<p className="mb-2">
									<span className="col_red me-1 fw-bold">
										Genres:
									</span>
									Action, Science Fiction
								</p>
								<h6 className="mt-4">
									<a
										className="btn btn-danger"
										href="http://127.0.0.1:8000/movie/trailer/5"
									>
										<i className="fa fa-play-circle align-middle me-1"></i>
										Watch Trailer
									</a>
								</h6>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							src="/assets/image/black-adam.jpg"
							className="d-block w-100"
							alt="Black Adam"
						/>

						<Carousel.Caption>
							<div className="animated zoomIn d-none d-md-block">
								<h1 className="font_60">Black Adam</h1>
								<p className="mt-3">
									The film is in the action and crime genre,
									starring Dwayne Johnson. The film is highly
									appreciated for its epic scenes, promising to
									become a blockbuster of European and American
									cinema.
								</p>
								<p className="mb-2">
									<span className="col_red me-1 fw-bold">
										Premiere:
									</span>
									21/10/2022
								</p>
								<p className="mb-2">
									<span className="col_red me-1 fw-bold">
										Genres:
									</span>
									Action, Fiction
								</p>
								<h6 className="mt-4">
									<button
										type="button"
										className="btn btn-danger"
										disabled
									>
										<i className="fa fa-play-circle align-middle me-1"></i>
										Watch Trailer
									</button>
								</h6>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							src="/assets/image/coco.jpg"
							className="d-block w-100"
							alt="Coco"
						/>

						<Carousel.Caption>
							<div className="animated zoomIn d-none d-md-block">
								<h1 className="font_60">Coco</h1>
								<p className="mt-3">
									The film is about the Mexican holiday Día de
									Muertos. The screenplay was written by Adrian
									Molina and Matthew Aldrich. Pixar began
									developing the film in 2016. Unkrich and his
									team also visited Mexico for inspiration. The
									skeletons in the movie were redesigned to look
									more attractive. Composer Michael Giacchino is
									in charge of composing the music.
								</p>
								<p className="mb-2">
									<span className="col_red me-1 fw-bold">
										Premiere:
									</span>
									20/10/2017
								</p>
								<p className="mb-2">
									<span className="col_red me-1 fw-bold">
										Genres:
									</span>
									Cartoon, Music
								</p>
								<h6 className="mt-4 mb-0">
									<a
										className="btn btn-danger"
										href="http://127.0.0.1:8000/movie/trailer/11"
									>
										<i className="fa fa-play-circle align-middle me-1"></i>
										Watch Trailer
									</a>
								</h6>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</section>

			{/* Start Trending */}
			<section id="popular" className="pt-4 pb-5">
				<div className="container  popular_1">
					<Tabs
						defaultActiveKey="showing"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab eventKey="showing" title="Showing">
							<OwlCarousel
								className="owl-theme"
								margin={10}
								items="5"
								autoplay
							>
								{data
									.filter((item) => item.status === "Showing")
									.map((item) => (
										<div
											className="item"
											key={item.id}
											data-aos="fade-left"
										>
											<div className="popular_2i1lm position-relative clearfix">
												<div className="popular_2i1lm1 clearfix">
													<div className="grid">
														<figure className="effect-jazz mb-0">
															<Link
																to={`/movies/detail/${item.id}`}
															>
																<img
																	src={`http://localhost:8080/uploads/movies/${item.poster}`}
																	className="w-100"
																	alt={
																		item.title
																	}
																/>
															</Link>
														</figure>
													</div>
												</div>
												<div className="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
													<ul>
														<li className="d-inline-block">
															<Link
																href={`/movie/trailer/${item.id}`}
															>
																<i
																	className="fa-brands fa-youtube"
																	style={{
																		color: "#ff0000",
																	}}
																></i>
															</Link>
														</li>
														<li className="d-inline-block">
															<a
																href={`/movie/detail/${item.id}`}
															>
																<i className="fa fa-search col_red"></i>
															</a>
														</li>
													</ul>
												</div>
												<div className="overlay position-absolute"></div>
											</div>
											<div className="popular_2i1lmr position-relative text-center">
												<h6 className="font_14 text-uppercase mb-2">
													<a
														href={`/movie/detail/${item.id}`}
													>
														{item.title}
													</a>
												</h6>
												<h6 className="font_12 mb-0">
													{item.genre}
												</h6>
											</div>
										</div>
									))}
							</OwlCarousel>
						</Tab>
						<Tab eventKey="coming" title="Coming Soon">
							<OwlCarousel
								className="owl-theme"
								margin={10}
								items="5"
								autoplay
							>
								{data
									.filter((item) => item.status === "Coming")
									.map((item) => (
										<div
											className="item"
											key={item.id}
											data-aos="fade-left"
										>
											<div className="popular_2i1lm position-relative clearfix">
												<div className="popular_2i1lm1 clearfix">
													<div className="grid">
														<figure className="effect-jazz mb-0">
															<Link
																to={`/movies/detail/${item.id}`}
															>
																<img
																	src={`http://localhost:8080/uploads/movies/${item.poster}`}
																	className="w-100"
																	alt={
																		item.title
																	}
																/>
															</Link>
														</figure>
													</div>
												</div>
												<div className="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
													<ul>
														<li className="d-inline-block">
															<Link
																href={`/movie/trailer/${item.id}`}
															>
																<i
																	className="fa-brands fa-youtube"
																	style={{
																		color: "#ff0000",
																	}}
																></i>
															</Link>
														</li>
														<li className="d-inline-block">
															<a
																href={`/movie/detail/${item.id}`}
															>
																<i className="fa fa-search col_red"></i>
															</a>
														</li>
													</ul>
												</div>
												<div className="overlay position-absolute"></div>
											</div>
											<div className="popular_2i1lmr position-relative text-center">
												<h6 className="font_14 text-uppercase mb-2">
													<a
														href={`/movie/detail/${item.id}`}
													>
														{item.title}
													</a>
												</h6>
												<h6 className="font_12 mb-0">
													{item.genre}
												</h6>
											</div>
										</div>
									))}
							</OwlCarousel>
						</Tab>
					</Tabs>
				</div>
			</section>
			{/* End Trending */}

			{/* Section NEW with Poster and horizontal lines */}
			<div className="new-section mt-5 text-center">
				<div className="d-flex align-items-center justify-content-center mb-4">
					<hr style={{ flex: 1, height: "2px", backgroundColor: "white" }} />
					<h1
						style={{
							fontSize: "40px",
							fontWeight: "bold",
							margin: "0 20px",
						}}
					>
						NEW
					</h1>
					<hr style={{ flex: 1, height: "2px", backgroundColor: "white" }} />
				</div>
				<img
					src="/assets/image/qc.jpg"
					alt="New Movie Poster"
					style={{
						width: "100%",
						height: "auto",
						maxWidth: "1300px", // Stretch image width
						margin: "0 auto",
						borderRadius: "15px",
					}}
				/>
			</div>

			{/* Review Section */}

			<section className="reviews-section mt-5" style={style.reviewSection}>
				{review.length > 0 && (
					<div style={style.container}>
						{/* Left large image */}
						<div style={style.leftImage}>
							<Link to={`/blog/${review[0]?.id}`}>
								<img
									src={`http://localhost:8080/uploads/blogs/${review[0]?.thumbnail}`}
									alt={review[0]?.title}
									style={style.largeImage}
								/>
							</Link>
						</div>
						{/* Right reviews list */}
						<div style={style.rightReviews}>
							{review.slice(1, 4).map((item, index) => (
								<Link
									key={item.id}
									to={`/blog/${item.id}`}
									style={style.reviewLink}
								>
									<div style={style.reviewRow}>
										<img
											src={`http://localhost:8080/uploads/blogs/${item.thumbnail}`}
											alt={item.title}
											style={style.smallImage}
										/>
										<div style={style.reviewContent}>
											<h6 style={style.reviewTitle}>
												{item.title}
											</h6>
											<div style={style.reviewMeta}>
												<div style={style.likeView}>
													{/* You can add additional meta information here if needed */}
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}
			</section>
			{/* End Review Section */}
		</div>
	);
}

export default HomePage;
