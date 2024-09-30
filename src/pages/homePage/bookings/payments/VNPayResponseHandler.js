import React, { useContext, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { sha512 } from "js-sha512";
import axios from "axios";
import { DataContext } from "../../../../contexts/DataContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

function VNPayResponseHandler(props) {
	const queryParams = queryString.parse(window.location.search);
	const vnp_HashSecret = "BEE0W9FW8QFF8OOAK3DMVW331HLY7TSD";
	//UseContext
	const { auth, orderAuth, bookAuth, bookingDelete, orderDelete } = useContext(DataContext);
	const navigate = useNavigate();
	//timing
	const [seconds, setSeconds] = useState(5);

	const remainingSeconds = seconds % 60;
	//fetch booking
	const [result, setResult] = useState(false);
	async function fetchBooking() {
		try {
			const response = await axios.get(
				`http://localhost:8080/bookings/byCustomer/${auth.id}`
			);
			return response.data.data;
		} catch (error) {
			console.log(error);
		}
	}
	async function deleteShowtimeIdAndCustomerId() {
		await axios.delete(
			`http://localhost:8080/bookings/deleteShowtimeIdAndCustomerId/${bookAuth?.showtimeId}/${auth.id}`
		);
	}
	async function deleteOrderDetail() {
		await axios.delete(`http://localhost:8080/orders/deleteByDetail/${orderAuth?.id}`);
	}

	function calculateSecureHash(queryParameters, vnp_HashSecret) {
		const sortedParams = Object.assign({}, queryParameters);
		delete sortedParams.vnp_SecureHash;
		const hmac = sha512.hmac.create(vnp_HashSecret);
		hmac.update(queryString.stringify(sortedParams));
		const secureHash = hmac.hex();
		return secureHash;
	}

	const submitDataMemo = useMemo(() => {
		return async () => {
			// Fetch booking data
			const bookingData = await fetchBooking();

			// Process booking and order data
			if (bookingData && bookingData.id) {
				const payment = {
					amount: queryParams.vnp_Amount / 100,
					bookingId: bookingData.id,
					orderId: Object.keys(orderAuth).length === 0 ? "" : orderAuth?.id,
				};

				// Make API call to submit payment
				const response = await axios.post(
					"http://localhost:8080/payments",
					payment
				);
				if (response.status === 200) {
					console.log("Payment successful");
				} else {
					console.log("Payment failed");
					// Handle payment failure (e.g., display an error message)
				}
			} else {
				console.log("Booking data not available");
			}
		};
	}, []);

	useEffect(() => {
		document.title = "TGV CINEMA || Payment Response Page";
		AOS.init({
			duration: 1200,
		});

		// Calculate secure hash
		const calculatedHash = calculateSecureHash(queryParams, vnp_HashSecret);
		if (
			calculatedHash === queryParams.vnp_SecureHash &&
			queryParams.vnp_ResponseCode === "00"
		) {
			// Payment successful
			setResult(true);
		} else {
			setResult(false);
			// Payment failed

			console.log("PAYMENT FAIL");

			// Handle payment failure (e.g., display an error message)
		}
		const intervalId = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else {
				clearInterval(intervalId);
				if (!result) {
					if (Object.keys(orderAuth ?? {}).length > 0) {
						deleteOrderDetail();
					}
					deleteShowtimeIdAndCustomerId();
				}
				if (result) {
					submitDataMemo();
				}
				bookingDelete();
				orderDelete();
				<Navigate to="./" />;
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [seconds]);

	return (
		<div style={styles.container}>
			<div style={styles.content} data-aos="slide-down">
				<h4 style={styles.header}>Transaction Report</h4>

				<div style={styles.resultMessage}>
					<h5
						style={
							result
								? styles.resultTitleSuccess
								: styles.resultTitleFailure
						}
					>
						{result ? "Payment Successful!" : "Payment Failed"}
					</h5>
					<p style={styles.resultDescription}>
						{result
							? "We're pleased to inform you that your payment has been successfully processed. You can view your order details and status in your account. Thank you for your purchase!"
							: "We regret to inform you that your payment could not be processed. Please review your payment information and try again. If the issue persists, please contact our customer support team."}
					</p>
				</div>

				<div style={styles.countdownContainer}>
					<Badge bg="light" text="dark" style={styles.countdownBadge}>
						Back To HomePage After:
					</Badge>
					<span style={styles.countdownTime}>
						{remainingSeconds < 10 ? "0" : ""}
						{remainingSeconds}s
					</span>
				</div>
			</div>
		</div>
	);
}

const styles = {
	container: {
		padding: "20px",
		background: "linear-gradient(to bottom, #111111, #480607)", // Nền gradient từ #111111 đến #480607
		minHeight: "100vh", // Đảm bảo chiều cao 100% của viewport
		display: "flex", // Để căn giữa theo chiều dọc và ngang
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		backgroundColor: "rgba(0, 0, 0, 0.0)", // Nền trong suốt
		color: "white", // Chữ trắng
		padding: "40px", // Tăng padding cho phần nội dung
		borderRadius: "12px", // Bo góc
		// boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng
		textAlign: "center",
		maxWidth: "600px", // Kích thước tối đa của hộp nội dung
		width: "100%", // Đảm bảo căn giữa nội dung
		fontSize: "1.2rem", // Kích thước font cho toàn bộ nội dung
	},
	header: {
		textTransform: "uppercase",
		fontWeight: "bold",
		marginBottom: "25px", // Tăng khoảng cách dưới tiêu đề
		color: "white", // Màu chữ trắng
		fontSize: "2rem", // Kích thước chữ cho tiêu đề
	},
	resultMessage: {
		marginBottom: "25px", // Tăng khoảng cách dưới kết quả
	},
	resultTitleSuccess: {
		fontSize: "1.6rem", // Kích thước chữ cho tiêu đề kết quả
		fontWeight: "bold",
		color: "#FF0000", // Màu đỏ cho thông báo thành công
	},
	resultTitleFailure: {
		fontSize: "1.6rem", // Kích thước chữ cho tiêu đề kết quả
		fontWeight: "bold",
		color: "white", // Màu chữ trắng cho thông báo thất bại
	},
	resultDescription: {
		fontSize: "1.2rem", // Kích thước chữ cho mô tả kết quả
		color: "white", // Chữ trắng cho mô tả
		marginTop: "15px",
		lineHeight: "1.8",
	},
	countdownContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "30px", // Tăng khoảng cách trên cho phần đếm ngược
	},
	countdownBadge: {
		marginRight: "15px", // Tăng khoảng cách giữa Badge và số giây
		padding: "12px", // Tăng kích thước badge
		fontSize: "1.2rem", // Kích thước chữ trong badge
		borderRadius: "10px",
		backgroundColor: "black", // Nền badge màu đen
		color: "white", // Chữ trắng trong badge
	},
	countdownTime: {
		fontSize: "2rem", // Kích thước chữ của thời gian
		fontWeight: "bold",
		color: "#FF5722", // Chữ màu đỏ cho thời gian đếm ngược
	},
};

export default VNPayResponseHandler;
