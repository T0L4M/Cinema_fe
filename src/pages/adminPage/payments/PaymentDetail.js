import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChair,
	faShoppingBag,
	faCalendarAlt,
	faFilm,
	faMapMarkerAlt,
	faClock,
} from "@fortawesome/free-solid-svg-icons";

function PaymentDetail() {
	const location = useLocation();
	const [paymentData, setPaymentData] = useState(location.state?.paymentData || {});
	const [convertedSeats, setConvertedSeats] = useState([]);
	const letters = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];
	const { id } = useParams();
	const [product, setProduct] = useState([]);

	const fetchPayment = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/payments/detail/${id}`);
			setPaymentData(response.data.data);
			await new Promise((resolve) => setTimeout(resolve, 2000));
		} catch (error) {
			console.log("ERROR FETCHING DATA: ", error);
		}
	};

	const fetchProduct = async (orderId) => {
		try {
			const response = await axios.get(
				`http://localhost:8080/order_details/detail/${orderId}`
			);
			setProduct(response.data.data);
		} catch (error) {
			console.log("ERROR FETCHING DATA: ", error);
		}
	};

	const convertSeats = (seats) => {
		if (typeof seats !== "string" && !Array.isArray(seats)) {
			console.error("Error: seatBookingList must be a string or an array of strings");
			return [];
		}

		const seatList = Array.isArray(seats) ? seats : seats.split(" ");
		const convertedSeats = [];

		seatList.forEach((seat) => {
			if (!isNaN(parseInt(seat[0]))) {
				const letter = letters[parseInt(seat[0]) - 1];
				const number = seat[2];
				convertedSeats.push(`${letter}${number}`);
			}
		});

		return convertedSeats.join("-");
	};

	useEffect(() => {
		fetchPayment();
		if (Object.keys(paymentData).length > 0) {
			const converted = convertSeats(paymentData?.booking?.seatBooking);
			setConvertedSeats(converted.length > 0 ? converted.split(" ") : []);

			if (paymentData?.order != null) {
				fetchProduct(paymentData.order.id);
			}
		}

		AOS.init();
	});

	// Inline styles using JavaScript objects
	const styles = {
		container: {
			maxWidth: "900px",
			margin: "0 auto",
			padding: "20px",
			background: "#F3F4F6", // Màu nền tổng thể dịu nhẹ
			borderRadius: "20px",
			boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
			fontFamily: "'Poppins', sans-serif", // Font hiện đại
		},
		card: {
			backgroundColor: "#ffffff",
			border: "none",
			borderRadius: "15px",
			boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
			transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
		},
		cardHeader: {
			backgroundColor: "#FF6F61", // Màu sắc nổi bật hơn
			color: "#fff",
			padding: "20px",
			borderRadius: "15px 15px 0 0",
			textAlign: "center",
			fontWeight: "bold",
			fontSize: "1.8rem",
			letterSpacing: "1px",
		},
		cardBody: {
			padding: "25px",
			backgroundColor: "#ffffff", // Màu sắc dịu hơn để phân biệt các phần
			borderRadius: "0 0 15px 15px",
		},
		badge: {
			padding: "10px",
			fontSize: "1.1rem",
			backgroundColor: "#E2E8F0", // Màu xám nhạt cho ô Seat
			borderRadius: "8px",
			marginRight: "6px",
			color: "#4A5568", // Màu xám đậm cho text trong ô
			transition: "background-color 0.3s ease",
		},
		listGroupItem: {
			backgroundColor: "#E2E8F0", // Màu nền đậm hơn cho phần Order
			border: "none",
			padding: "15px",
			borderRadius: "10px",
			marginBottom: "15px",
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ cho phần Order
			transition: "background-color 0.3s ease",
		},
		strongText: {
			color: "#4A5568", // Màu xám đậm cho tiêu đề
			fontWeight: "bold",
			display: "flex",
			alignItems: "center",
		},
		graySmallBoldText: {
			color: "#718096", // Màu xám nhạt
			fontSize: "0.9rem", // Font nhỏ hơn
			fontWeight: "bold", // Chữ in đậm
		},
		boldGrayText: {
			color: "#A0AEC0", // Màu xám nhạt cho "bap" và "1"
			fontWeight: "bold", // In đậm cả số lẫn chữ
		},
		icon: {
			marginRight: "10px",
			color: "#FF6F61",
		},
		paragraph: {
			marginBottom: "18px",
			fontSize: "1.2rem", // Font lớn hơn chút để dễ đọc hơn
			color: "#4A5568", // Màu xám đậm cho các chữ kế bên icon
		},
		productInfo: {
			display: "flex", // Sử dụng Flexbox để căn chỉnh trên một dòng
			justifyContent: "flex-start", // Đưa các phần tử lại gần nhau hơn, bắt đầu từ trái
			alignItems: "center", // Căn giữa theo chiều dọc
			width: "100%",
			marginBottom: "10px", // Khoảng cách dưới giữa các phần
		},
		productText: {
			color: "#A0AEC0", // Màu xám nhạt cho "bap" và "1"
			fontWeight: "bold", // In đậm
			marginLeft: "50px", // Tăng khoảng cách giữa "Tên sản phẩm" và "bap" (hoặc "Số lượng" và "1")
		},
	};

	return (
		<div className="container mt-5" style={styles.container}>
			{/* LOADER SPINNER */}
			{Object.keys(paymentData).length === 0 && (
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

			{Object.keys(paymentData).length > 0 && (
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card" style={styles.card} data-aos="flip-left">
							<div className="card-header" style={styles.cardHeader}>
								<h4 className="text-uppercase mb-0">
									{paymentData.booking.customer.userName}
								</h4>
							</div>
							<div className="card-body" style={styles.cardBody}>
								<p style={styles.paragraph}>
									<strong style={styles.strongText}>
										<FontAwesomeIcon
											icon={faChair}
											style={styles.icon}
										/>
										Seat:
									</strong>
									{convertedSeats.length === 0 ? (
										<span> Loading...</span>
									) : (
										convertedSeats.map((seat, index) => (
											<span
												key={index}
												className="badge"
												style={styles.badge}
											>
												{seat}
											</span>
										))
									)}
								</p>
								<p style={styles.paragraph}>
									<strong style={styles.strongText}>
										<FontAwesomeIcon
											icon={faShoppingBag}
											style={styles.icon}
										/>
										Order:
									</strong>
									<div
										className="list-group-item"
										style={styles.listGroupItem}
									>
										<p style={styles.productInfo}>
											<strong style={styles.strongText}>
												Tên sản phẩm:
											</strong>{" "}
											<span style={styles.boldGrayText}>
												{product.length > 0 &&
													product[0].product
														.name}
											</span>
										</p>
										<p style={styles.productInfo}>
											<strong style={styles.strongText}>
												Số lượng:
											</strong>{" "}
											<span style={styles.boldGrayText}>
												{product.length > 0 &&
													product[0]
														.product_quantity}
											</span>
										</p>
									</div>
								</p>
								<p style={styles.paragraph}>
									<strong style={styles.strongText}>
										<FontAwesomeIcon
											icon={faCalendarAlt}
											style={styles.icon}
										/>
										Date:
									</strong>{" "}
									<span style={styles.graySmallBoldText}>
										{
											paymentData.booking.showtime
												.showtime_date
										}
									</span>
								</p>
								<p style={styles.paragraph}>
									<strong style={styles.strongText}>
										<FontAwesomeIcon
											icon={faFilm}
											style={styles.icon}
										/>
										Movie:
									</strong>{" "}
									<span style={styles.graySmallBoldText}>
										{
											paymentData.booking.showtime.movie
												.title
										}
									</span>
								</p>
								<p style={styles.paragraph}>
									<strong style={styles.strongText}>
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
											style={styles.icon}
										/>
										Auditoria:
									</strong>{" "}
									<span style={styles.graySmallBoldText}>
										{
											paymentData.booking.showtime
												.auditoria.name
										}
									</span>
								</p>
								<p style={styles.paragraph}>
									<strong style={styles.strongText}>
										<FontAwesomeIcon
											icon={faClock}
											style={styles.icon}
										/>
										Time From:
									</strong>{" "}
									<span style={styles.graySmallBoldText}>
										{
											paymentData.booking.showtime.hour
												.time_from
										}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default PaymentDetail;
