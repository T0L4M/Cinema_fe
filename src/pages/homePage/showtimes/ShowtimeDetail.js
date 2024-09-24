import axios from "axios";
import { format, isBefore, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ShowtimeDetail(props) {
	const [details, setDetails] = useState([]);
	const { idMovie } = useParams();

	const fetchDetails = async () => {
		const response = await axios.get(`http://localhost:8080/showtimes/movie/${idMovie}`);
		setDetails(response.data.data);
	};
	useEffect(() => {
		fetchDetails();
	}, []);
	const groupedByMovie = details.reduce((acc, cur) => {
		const movieId = cur.movie.id; // Assuming 'movie' property holds movie information
		acc[movieId] = acc[movieId] || [];
		acc[movieId].push(cur);
		return acc;
	}, {});
	const isAfterToday = (date) => !isBefore(date, new Date());
	const isToday = (date) => format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
	return (
		<div class="container">
			{Object.entries(groupedByMovie).map(([movieId, movieShowtimes]) => {
				return (
					<div class="row">
						<div class="col-md-4" key={movieId}>
							<img
								src={`http://localhost:8080/uploads/movies/${movieShowtimes[0].movie.poster}`}
								alt="img"
								class="img-thumbnail w-100"
							/>
						</div>
						<div class="col-md-8">
							<h3>{movieShowtimes[0].movie.title}</h3>
							{movieShowtimes
								.filter(
									(showtime) =>
										isAfterToday(
											parseISO(showtime.showtime_date)
										) ||
										(isToday(
											parseISO(showtime.showtime_date)
										) &&
											new Date() <
												new Date(
													`${showtime.showtime_date} ${showtime.hour.time_from}`
												))
								)
								.reduce((acc, curShowtime) => {
									const formattedDate = format(
										parseISO(curShowtime.showtime_date),
										"dd-MM-yyyy"
									);
									const existingDate = acc.find(
										(dateObj) =>
											dateObj.date === formattedDate
									);

									if (existingDate) {
										existingDate.showtimes.push(
											curShowtime
										);
									} else {
										acc.push({
											date: formattedDate,
											showtimes: [curShowtime],
										});
									}

									return acc;
								}, [])
								.map((dateObj) => (
									<div key={dateObj.date}>
										<p>{dateObj.date}</p>
										{dateObj.showtimes.map(
											(filteredShowtime) => (
												<Link
													key={
														filteredShowtime.id
													}
													className="btn btn-light ms-3"
													to={`/booking/${filteredShowtime.id}`}
													data-aos="fade-right"
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
								))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ShowtimeDetail;
