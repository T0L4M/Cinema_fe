import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Carousel, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

function HomePage(props) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { auth, alert } = useContext(DataContext);
	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/movies");
			setData(response.data.data);
			setIsLoading(false);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			{alert.type != "" && (
				<Alert
					variant={alert.type}
					dismissible
					transition
					style={{ width: "fit-content", float: "right" }}
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
				<div className="container">
					<div className="row popular_1 mt-4">
						<ul className="nav nav-tabs border-0 mb-0">
							<li className="nav-item">
								<Link
									to="#dangchieu"
									data-bs-toggle="tab"
									aria-expanded="false"
									className="nav-link active"
								>
									<span className="d-md-block">
										NOW SHOWING
									</span>
								</Link>
							</li>
							<li className="nav-item">
								<a
									href="#sapchieu"
									data-bs-toggle="tab"
									aria-expanded="false"
									className="nav-link"
								>
									<span className="d-md-block">
										COMING SOON
									</span>
								</a>
							</li>
						</ul>
					</div>
					<div className="popular_2 row mt-4">
						<div className="tab-content">
							<div className="tab-pane active" id="dangchieu">
								<div
									className="owl-carousel owl-theme"
									// data-aos="fade-left"
								>
									{data
										.filter(
											(item) =>
												item.status === "showing"
										)
										.map((item) => (
											<div
												className="item"
												key={item.id}
											>
												<div className="popular_2i1lm position-relative clearfix">
													<div className="popular_2i1lm1 clearfix">
														<div className="grid">
															<figure className="effect-jazz mb-0">
																<a
																	href={`/movie/detail/${item.id}`}
																>
																	<img
																		src={`http://localhost:8080/uploads/movies/${item.poster}`}
																		className="w-100"
																		alt={
																			item.title
																		}
																	/>
																</a>
															</figure>
														</div>
													</div>
													<div className="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
														<ul>
															<li className="d-inline-block">
																<a
																	href={`/movie/trailer/${item.id}`}
																>
																	<i
																		className="fa-brands fa-youtube"
																		style={{
																			color: "#ff0000",
																		}}
																	></i>
																</a>
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
															{
																item.title
															}
														</a>
													</h6>
													{/* <h6 className="mb-0">
													<span className="col_red font_700">
														{item.rating}
													</span>
													/10 |{" "}
													<span>
														{item.runtime}{" "}
														min
													</span>
												</h6> */}
													<h6 className="font_12 mb-0">
														{item.genre}
													</h6>
												</div>
											</div>
										))}
								</div>
							</div>

							<div className="tab-pane" id="sapchieu">
								<div
									className="owl-carousel owl-theme"
									// data-aos="fade-left"
								>
									{data
										.filter(
											(item) => item.status === "coming"
										)
										.map((item) => (
											<div
												className="item"
												key={item.movie_id}
											>
												<div className="popular_2i1lm position-relative clearfix">
													<div className="popular_2i1lm1 clearfix">
														<div className="grid">
															<figure className="effect-jazz mb-0">
																<a
																	href={`/movie/detail/${item.movie_id}`}
																>
																	<img
																		src={`http://localhost:8080/uploads/movies/${item.poster}`}
																		className="w-100"
																		alt={
																			item.title
																		}
																	/>
																</a>
															</figure>
														</div>
													</div>
													<div className="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
														<ul>
															<li className="d-inline-block">
																<a
																	href={`/movie/trailer/${item.movie_id}`}
																>
																	<i
																		className="fa-brands fa-youtube"
																		style={{
																			color: "#ff0000",
																		}}
																	></i>
																</a>
															</li>
															<li className="d-inline-block">
																<a
																	href={`/movie/detail/${item.movie_id}`}
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
															href={`/movie/detail/${item.movie_id}`}
														>
															{
																item.title
															}
														</a>
													</h6>
													{/* <h6 className="mb-0">
													<span className="col_red font_700">
														{item.rating}
													</span>
													/10 |{" "}
													<span>
														{item.runtime}{" "}
														min
													</span>
												</h6> */}
													<h6 className="font_12 mb-0">
														{item.genre}
													</h6>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* End Trending */}
		</div>
	);
}

export default HomePage;
