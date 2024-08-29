import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format, isBefore, parseISO } from "date-fns";

function ShowtimePage(props) {
	const [showtimes, setShowtimes] = useState([]);

	useEffect(() => {
		async function fetchShowtimes() {
			const response = await axios.get("http://localhost:8080/showtimes/show");
			setShowtimes(response.data.data);
		}

		fetchShowtimes();
	}, []);

	// const groupedShowtimes = showtimes.reduce((acc, cur) => {
	// 	const date = new Date(cur.showtime_date).toLocaleDateString();
	// 	acc[date] = acc[date] || [];
	// 	acc[date].push(cur);
	// 	return acc;
	// }, {});

	const groupedByMovie = showtimes.reduce((acc, cur) => {
		const movieId = cur.movie.id; // Assuming 'movie' property holds movie information
		acc[movieId] = acc[movieId] || [];
		acc[movieId].push(cur);
		return acc;
	}, {});

	return (
		<div class="container">
			<div class="row">
				{Object.entries(groupedByMovie).map(([movieId, movieShowtimes]) => {
					return (
						<div key={movieId} className="col-md-6 col-sm-12 row mb-3">
							<div className="col-md-3 col-6">
								<Link to={`/moviedetail/`}>
									<img
										src={`http://localhost:8080/uploads/movies/${movieShowtimes[0].movie.poster}`}
										alt="img"
										className="img-thumbnail w-100"
									/>
								</Link>
							</div>
							<div className="col-md-9 col-6">
								<h3>{movieShowtimes[0].movie.title}</h3>
								{Object.values(groupedByMovie).map(
									(showtimesForDate) => {
										const filteredShowtimes =
											showtimesForDate.filter(
												(showtime) =>
													showtime.movie.id ===
														movieShowtimes[0]
															.movie
															.id &&
													isBefore(
														parseISO(
															showtime.showtime_date
														),
														new Date()
													) === false
											);

										if (filteredShowtimes.length > 0) {
											return (
												<div
													key={
														showtimesForDate[0]
															.showtime_date
													}
												>
													<p>
														{format(
															showtimesForDate[0]
																.showtime_date,
															"dd-MM-yyyy"
														)}
													</p>
													{showtimesForDate
														.filter(
															(
																showtime
															) =>
																showtime
																	.movie
																	.id ===
																movieShowtimes[0]
																	.movie
																	.id
														)
														.map(
															(
																filteredShowtime
															) => (
																<Link
																	key={
																		filteredShowtime.id
																	}
																	className="btn btn-light ms-3"
																	to={`/booking/${filteredShowtime.id}`}
																	// data-aos="fade-right"
																>
																	{format(
																		new Date(
																			`${filteredShowtime.showtime_date} ${filteredShowtime.hour.time_from}`
																		),
																		"HH:mm"
																	)}
																</Link>
															)
														)}
												</div>
											);
										}
									}
								)}
							</div>
						</div>
					);
					// }
				})}
			</div>
		</div>
	);
}
export default ShowtimePage;
