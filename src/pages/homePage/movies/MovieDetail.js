import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
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
		<div className="container" style={styles.container}>
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
				<div className="row" style={styles.row}>
					<div className="col-md-4 my-2" data-aos="fade-right">
						<img
							src={`http://localhost:8080/uploads/movies/${data.poster}`}
							onError={(e) => {
								e.target.src = "path/to/default-image.jpg";
							}}
							alt="img"
							className="img-thumbnail w-100"
							style={styles.poster}
						/>
					</div>
					<div
						className="col-md-8"
						style={styles.contentContainer}
						data-aos="flip-left"
					>
						<div className="container">
							<div className="header mt-2">
								<h4
									style={{
										textTransform: "uppercase",
										color: "white",
									}}
								>
									{data.title}
								</h4>
							</div>
							<div className="below" style={styles.text}>
								<p>
									Premiere:{" "}
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
										className="fa-brands fa-youtube me-2"
										style={{ color: "#ff0000" }}
									></i>
									TRAILER
								</button>

								<Link
									to={`/showtimes/movie/${data.id}`}
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

const styles = {
	container: {
		// background: " #111111", // Gradient cho nền ngoài
		minHeight: "100vh", // Đảm bảo chiều cao 100% của viewport
		padding: "20px",
	},
	row: {
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: "40px", // Đẩy toàn bộ nội dung xuống
	},
	poster: {
		maxHeight: "600px", // Điều chỉnh kích thước để hình không quá lớn
		width: "auto", // Giữ tỉ lệ của hình ảnh
		borderRadius: "8px",
		marginTop: "20px", // Đẩy hình xuống thêm một chút
	},
	contentContainer: {
		backgroundColor: "#555555", // Đổi nền trong thành màu #343434
		borderRadius: "12px",
		padding: "20px",
		color: "white", // Chữ màu trắng
		marginTop: "20px", // Đẩy phần nội dung xuống thêm một chút để cân đối với hình ảnh
		minHeight: "600px", // Tăng chiều cao của phần nội dung cho phù hợp với hình ảnh
		display: "flex",
		flexDirection: "column", // Sắp xếp các phần tử theo chiều dọc
		justifyContent: "space-between", // Tạo không gian giữa các phần tử
	},
	text: {
		color: "white", // Đổi toàn bộ chữ thành màu trắng
		fontSize: "1rem",
		lineHeight: "1.6", // Tăng khoảng cách giữa các dòng để nội dung dễ đọc hơn
	},
};

export default MovieDetail;
