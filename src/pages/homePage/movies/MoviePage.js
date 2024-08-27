import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";

function MoviePage(props) {
	const [data, setData] = useState([]);
	const { alert } = useContext(DataContext);
	const { status } = useParams();
	const navigate = useNavigate();

	const fetchData = async () => {
		const url = status
			? status === "showing"
				? "http://localhost:8080/movies/showing"
				: "http://localhost:8080/movies/coming"
			: "http://localhost:8080/movies";

		try {
			const response = await axios.get(url);
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [status]);
	console.log("data:", data);

	return (
		<div class="container">
			<div class="row">
				{/* LOADER SPINNER */}
				{data.length == 0 && (
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

				{data.length > 0 &&
					data.map((item, index) => {
						return (
							<div class="col-md-6" key={index}>
								<div
									class="row m-2"
									style={{ backgroundColor: "#CAA73A" }}
								>
									<div class="col-md-6">
										<Link to={""}>
											<img
												src={`http://localhost:8080/uploads/movies/${item.poster}`}
												onError={(e) => {
													e.target.src =
														"path/to/default-image.jpg";
												}}
												alt="img"
												class="img-thumbnail w-100"
											/>
										</Link>
									</div>
									<div class="col-md-6">
										<h4 class="mt-2">{item.title}</h4>
										<p>{item.description}</p>
										<Link
											to={""}
											class="btn btn-outline-light py-2 text-dark"
											style={{ borderRadius: "10px" }}
										>
											<i
												class="fa-solid fa-ticket me-2"
												style={{ color: "#ff0000" }}
											></i>
											BUY TICKETS
										</Link>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default MoviePage;
