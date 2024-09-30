import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function MoviePage() {
	const [data, setData] = useState([]);
	const [hoveredMovie, setHoveredMovie] = useState(null); // Trạng thái để theo dõi phim được hover
	const { status } = useParams();

	// Fetch data
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
		document.title = "TGV CINEMA || Movie Page";

		fetchData();
		AOS.init({
			duration: 1200,
		});
	}, [status]);

	// Inline CSS styles
	const containerStyle = {
		marginTop: "100px",
	};

	const cardStyle = (isHovered) => ({
		position: "relative",
		width: "100%",
		maxWidth: "300px",
		border: "1px solid #b30000", // Đường viền đỏ
		borderRadius: "15px", // Góc bo tròn
		backgroundColor: "#330000", // Màu nền tối
		padding: "10px",
		margin: "20px auto",
		textAlign: "center",
		color: "white",
		overflow: "hidden",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ
		transition: "transform 0.3s ease-in-out",
		transform: isHovered ? "scale(1.1)" : "scale(1)", // Phóng to khi hover
	});

	const posterStyle = {
		borderRadius: "15px",
		width: "100%",
		objectFit: "cover",
	};

	const bookButtonStyle = (isHovered) => ({
		position: "absolute",
		bottom: "10px", // Đặt nút ngay phía trên tiêu đề phim
		left: "50%",
		transform: "translateX(-50%)",
		backgroundColor: "white",
		padding: "10px 20px",
		borderRadius: "20px",
		color: "red",
		fontWeight: "bold",
		fontSize: "14px",
		textDecoration: "none",
		opacity: isHovered ? "1" : "0", // Hiện nút khi hover
		transition: "opacity 0.3s ease-in-out",
		zIndex: "10", // Đảm bảo nút xuất hiện trên các phần khác
	});

	const titleStyle = {
		marginTop: "10px", // Giữ khoảng cách giữa nút và tiêu đề phim
		fontSize: "18px",
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: "1px",
	};

	return (
		<div className="container" style={containerStyle}>
			<div className="row">
				{/* LOADER SPINNER */}
				{data.length === 0 && (
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

				{data.length > 0 && (
					<div className="row">
						{data.map((item) => {
							const isHovered = hoveredMovie === item.id;
							return (
								<div
									className="col-md-3 mb-4"
									key={item.id}
									data-aos="fade-left"
									onMouseEnter={() => setHoveredMovie(item.id)} // Đặt trạng thái khi hover
									onMouseLeave={() => setHoveredMovie(null)} // Bỏ trạng thái khi rời chuột
								>
									<div
										className="movie-card"
										style={cardStyle(isHovered)}
									>
										<div
											className="movie-poster"
											style={{ position: "relative" }}
										>
											<Link
												to={`/movies/detail/${item.id}`}
											>
												<img
													src={`http://localhost:8080/uploads/movies/${item.poster}`}
													style={posterStyle}
													alt={item.title}
												/>
											</Link>
											<Link
												to={`/movies/detail/${item.id}`} // Cả "Book Now" cũng dẫn đến trang chi tiết
												style={bookButtonStyle(
													isHovered
												)}
												className="book-now-button"
											>
												Book Now
											</Link>
										</div>
										<div className="movie-info">
											<h6 style={titleStyle}>
												<Link
													to={`/movies/detail/${item.id}`}
													style={{
														color: "white",
														textDecoration:
															"none",
													}}
												>
													{item.title}
												</Link>
											</h6>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default MoviePage;
