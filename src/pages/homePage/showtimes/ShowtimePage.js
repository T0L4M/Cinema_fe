import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

function ShowtimePage(props) {
	const [showtimes, setShowtimes] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date()); // State để theo dõi ngày đã chọn
	const currentDate = new Date(); // Ngày hiện tại

	// Fetch data khi component được render
	useEffect(() => {
		async function fetchShowtimes() {
			const response = await axios.get("http://localhost:8080/showtimes/show");
			setShowtimes(response.data.data);
		}
		AOS.init({
			duration: 1200, // Hiệu ứng AOS (animation)
		});
		fetchShowtimes();
	}, []);

	// Group các suất chiếu theo phim
	const groupedByMovie = showtimes.reduce((acc, cur) => {
		const movieId = cur.movie.id;
		acc[movieId] = acc[movieId] || [];
		acc[movieId].push(cur);
		return acc;
	}, {});

	// Hàm thay đổi ngày khi click vào ngày
	const handleDateClick = (day) => {
		setSelectedDate(day);
	};

	return (
		<div className="container showtime-container">
			{/* Phần chọn ngày */}
			<div className="date-selector d-flex justify-content-around">
				{[...Array(7)].map((_, index) => {
					const day = new Date(currentDate);
					day.setDate(currentDate.getDate() + index); // Cộng thêm ngày dựa vào index
					return (
						<div
							key={index}
							className={`date-item ${
								format(day, "yyyy-MM-dd") ===
								format(selectedDate, "yyyy-MM-dd")
									? "active"
									: ""
							}`}
							onClick={() => handleDateClick(day)} // Xử lý click để chọn ngày
						>
							<span className="date-day">{format(day, "EEE")}</span>{" "}
							<span className="date-number">{format(day, "dd")}</span>
						</div>
					);
				})}
			</div>

			{/* Hiển thị danh sách các phim */}
			<div className="row justify-content-start">
				{Object.entries(groupedByMovie).map(([movieId, movieShowtimes]) => {
					const filteredShowtimes = movieShowtimes.filter(
						(showtime) =>
							format(new Date(showtime.showtime_date), "yyyy-MM-dd") ===
							format(selectedDate, "yyyy-MM-dd")
					); // Lọc suất chiếu theo ngày đã chọn

					return (
						<div key={movieId} className="col-md-12 movie-container">
							<div className="movie-img-wrapper">
								<Link to={`/moviedetail/`}>
									<img
										src={`http://localhost:8080/uploads/movies/${movieShowtimes[0].movie.poster}`}
										alt="movie-poster"
										className="movie-poster"
									/>
								</Link>
							</div>

							<div className="movie-info">
								<h4 className="movie-title">
									{movieShowtimes[0].movie.title}
								</h4>
								{filteredShowtimes.map((showtime) => (
									<div
										className="showtime-info"
										key={showtime.id}
									>
										{/* <p className="showtime-date">
											{format(
												new Date(
													showtime.showtime_date
												),
												"dd-MM-yyyy"
											)}
										</p> */}
										<div className="time-buttons">
											<Link
												key={showtime.id}
												className="btn btn-showtime"
												to={`/booking/${showtime.id}`}
												data-aos="fade-right"
											>
												{format(
													new Date(
														`${showtime.showtime_date} ${showtime.hour.time_from}`
													),
													"HH:mm"
												)}
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>

			{/* CSS nội tuyến */}
			<style>{`
        .showtime-container {
          background-color: #121212;
          color: #fff;
          padding: 20px;
          border-radius: 10px;
        }

        .movie-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .movie-title {
          font-size: 30px;
          font-weight: bold;
        }

        .movie-info {
          font-size: 16px;
          color: #999;
        }

        .date-selector {
          display: flex;
          justify-content: space-between;
          margin-bottom: 50px;
          padding-top: 60px;  
        }

        .date-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          padding: 10px;
          cursor: pointer; /* Thêm con trỏ khi hover vào ngày */
        }

        .date-item.active {
          border-bottom: 2px solid red;
        }

        .date-day {
          font-size: 14px;
        }

        .date-number {
          font-size: 24px;
          font-weight: bold;
        }

       

        .movie-container {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
          padding: 10px;
          background-color: #222;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .movie-img-wrapper {
          width: 150px;
          height: auto;
          margin-right: 20px;
        }

        .movie-poster {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 10px;
        }

        .showtime-info {
          margin-top: 15px;
        }

        .time-buttons {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .btn-showtime {
          background-color: #e50914;
          color: white;
          margin: 5px;
          padding: 10px 20px;
          border-radius: 5px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
        }

        .btn-showtime:hover {
          background-color: #b20710;
        }

        @media (min-width: 768px) {
          .movie-container {
            width: 100%;
          }
        }
      `}</style>
		</div>
	);
}

export default ShowtimePage;
