import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { Button } from "react-bootstrap";
import ModalMovieTrailer from "./ModalMovieTrailer";
import AOS from "aos";
import "aos/dist/aos.css";

function MovieDetail(props) {
	const [data, setData] = useState({});
	const { id } = useParams();

	const [modalShow, setModalShow] = React.useState(false);

	const fetchData = async () => {
		const url = `http://localhost:8080/movies/detail/${id}`;

		try {
			const response = await axios.get(url);
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	useEffect(() => {
		AOS.init({
			duration: 1200,
		});
		fetchData();
	}, []);

	return (
		<div className="container">
			{/* LOADER SPINNER */}
			{Object.keys(data).length === 0 && (
				<ColorRing
					visible={true}
					height="80"
					width="80"
					ariaLabel="blocks-loading"
					wrapperStyle={{ display: "block", margin: "auto" }}
					wrapperClass="blocks-wrapper"
					colors={["#F5F5F5", "#313236", "#7CD6EA", "#172765", "#F5F5F5"]}
				/>
			)}
			{/* END LOADER SPINNER */}

			{Object.keys(data).length > 0 && (
				<div className="row">
					<div className="col-md-4 my-2" data-aos="fade-right">
						<img
							src={`http://localhost:8080/uploads/movies/${data.poster}`}
							onError={(e) => {
								e.target.src = "path/to/default-image.jpg";
							}}
							alt="img"
							className="img-thumbnail w-100"
						/>
					</div>
					<div
						className="col-md-8"
						style={{ backgroundColor: "#CAA73A", borderRadius: "2%" }}
						data-aos="flip-left"
					>
						<div className="container">
							<div className="header mt-2">
								<h4 style={{ textTransform: "uppercase" }}>
									{data.title}
								</h4>
							</div>
							<div className="below">
								<p>
									Premiere:
									<span>
										{format(
											data.release_date,
											"dd-MM-yyyy"
										)}
									</span>
								</p>
								<p>
									Genre: <span>{data.genre}</span>
								</p>
								<p>
									Casts: <span>{data.casts}</span>
								</p>
								<p>
									Director: <span>{data.director}</span>
								</p>

								<p>{data.description}</p>
							</div>
							<div>
								<button
									className="btn btn-outline-light btn-dark py-2 me-2"
									onClick={() => setModalShow(true)}
								>
									<i
										class="fa-brands fa-youtube me-2"
										style={{ color: "#ff0000" }}
									></i>
									TRAILER
								</button>

								<Link
									to={`/booking/${data.id}`}
									className="btn btn-outline-light py-2"
									style={{ borderRadius: "10px" }}
								>
									<i
										className="fa-solid fa-ticket me-2"
										style={{ color: "#ff0000" }}
									></i>
									BUY TICKETS
								</Link>

								<ModalMovieTrailer
									show={modalShow}
									onHide={() => setModalShow(false)}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default MovieDetail;
