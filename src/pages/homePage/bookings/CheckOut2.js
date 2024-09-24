import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { format } from "date-fns";
import { Badge, Button, Collapse } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import VNPay from "./payments/VNPay";
import AOS from "aos";
import "aos/dist/aos.css";

function CheckOut2(props) {
	const { bookAuth, bookingDelete, showAlert, auth, orderSaving, orderDelete, orderAuth } =
		useContext(DataContext);
	const [showtime, setShowtime] = useState(null);
	const [products, setProducts] = useState([]);
	const [data, setData] = useState(
		{
			seatBookingList: bookAuth?.seatBookingList,
			productList: bookAuth?.productList,
			productQuantities: {},
			customerId: auth.id,
			showtimeId: bookAuth?.showtimeId,
		} || {}
	);
	const [quantity, setQuantity] = useState(() => {
		const initialQuantities = {};
		bookAuth?.productList?.forEach((productId) => {
			initialQuantities[productId] = 1;
		});
		return initialQuantities;
	});
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
	const [open, setOpen] = useState(false);
	const [isCountingDown, setIsCountingDown] = useState(false);
	const [confirm, setConfirm] = useState(false);

	const [seconds, setSeconds] = useState(300);
	const navigate = useNavigate();

	const handleData = async () => {
		if (bookAuth != null) {
			await new Promise((resolve) => setTimeout(resolve, 500));
			await axios
				.get(`http://localhost:8080/showtimes/detail/${bookAuth.showtimeId}`)
				.then((res) => {
					setShowtime(res.data.data);
				})
				.catch((err) => console.log("SHOWTIME FETCHING: ", err));

			await axios
				.get("http://localhost:8080/products/selling")
				.then((res) => {
					setProducts(res.data.data);
				})
				.catch((err) => console.log("PRODUCT FETCHING: ", err));
		} else {
			console.log("No Booking!");
		}
	};

	const handleQuantityChange = (event, productId) => {
		setQuantity((prevState) => ({
			...prevState,
			[productId]: parseInt(event.target.value),
		}));
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

	const calculateTotalAmount = () => {
		let total = 0;

		if (bookAuth?.productList.length > 0) {
			for (const productId in quantity) {
				const product = products.find((p) => p.id == productId);
				if (product) {
					total += product.price * quantity[productId];
				}
			}
		}
		if (showtime != null) {
			total += bookAuth?.seatBookingList.length * showtime.hour.price;
		}

		return total;
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const response = await axios.post("http://localhost:8080/orders/allCreate", data);
		if (response.status == 200) {
			setConfirm(true);
			setOpen(!open);
			setIsCountingDown(true);
			if (data.productList.length > 0) {
				orderSaving(response.data.data);
			}
		} else {
			console.log("FAIL!!!!");
		}
	}

	async function deleteShowtimeIdAndCustomerId() {
		const response = await axios.delete(
			`http://localhost:8080/bookings/deleteShowtimeIdAndCustomerId/${showtime.id}/${auth.id}`
		);
	}
	async function deleteOrderDetail() {
		const response = await axios.delete(
			`http://localhost:8080/orders/deleteByDetail/${orderAuth?.id}`
		);
	}
	//Delete booking and order when cancel
	const cancelHandeler = () => {
		if (!confirm) {
			if (window.confirm("Back to the showtime page?")) {
				bookingDelete();
				return;
			}
		}
		if (Object.keys(orderAuth ?? {}).length > 0) {
			deleteOrderDetail();
		}
		deleteShowtimeIdAndCustomerId();
		if (window.confirm("Back to the showtime page?")) {
			bookingDelete();
			orderDelete();
		}
	};

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	useEffect(() => {
		if (isCountingDown) {
			const intervalId = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1);
				} else {
					clearInterval(intervalId);
					if (Object.keys(orderAuth ?? {}).length > 0) {
						deleteOrderDetail();
					}
					if (window.confirm("Back to the showtime page and book again?")) {
						deleteShowtimeIdAndCustomerId();
						bookingDelete();
						orderDelete();
					}
				}
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [isCountingDown, seconds]);

	useEffect(() => {
		setData((prevState) => ({
			...prevState,
			productQuantities: quantity,
		}));
	}, [quantity]);

	useEffect(() => {
		AOS.init({
			duration: 1200,
		});
		if (Object.keys(bookAuth).length === 0) {
			showAlert("danger", "Something went wrong!");
			navigate("/");
		}
		handleData();
		const converted = convertSeats(bookAuth?.seatBookingList);
		setConvertedSeats(converted.length > 0 ? converted.split(" ") : []);
	}, [bookAuth]);

	return (
		<div className="checkout-container" style={styles.container}>
			<header data-aos="fade-right" style={styles.header}>
				<h2 style={styles.movieTitle}>{showtime?.movie?.title}</h2>
				<div className="d-flex align-items-center justify-content-between">
					<span style={styles.locationGray}>AMPANG POINT - CINEMA 1</span>
					<span style={styles.time}>
						{showtime?.hour.time_from} - {showtime?.hour.date}
					</span>
				</div>
			</header>

			{showtime == null && (
				<ColorRing
					visible={true}
					height="80"
					width="80"
					ariaLabel="blocks-loading"
					wrapperStyle={{ display: "block", margin: "auto" }}
					wrapperClass="blocks-wrapper"
					colors={["#213363", "#1B6B93", "#4FC0D0", "#FF9EAA"]}
				/>
			)}

			{showtime != null && (
				<div className="row" style={styles.row}>
					<div className="col-md-8" style={styles.contentContainer}>
						<form onSubmit={handleSubmit}>
							{/* Member Section */}
							<div className="member-section" style={styles.section}>
								<div style={styles.sectionHeader}>
									<span>Member</span>
									<span>{auth?.userName}</span>
								</div>
							</div>

							{/* Showtime Section */}
							<div className="showtime-section" style={styles.section}>
								<div style={styles.sectionHeader}>
									<span>Showtime</span>
									<span>
										{showtime?.hour.time_from},{" "}
										{showtime?.hour.date}
									</span>
								</div>
							</div>

							{/* Seats Section */}
							<div className="seats-section" style={styles.section}>
								<div style={styles.sectionHeader}>
									<span>Seats</span>
									<span>{convertedSeats}</span>
								</div>
							</div>

							{/* Ticket Price Section */}
							<div
								className="ticket-price-section"
								style={styles.section}
							>
								<div style={styles.sectionHeader}>
									<span>Ticket Price</span>
									<span>
										RM{" "}
										{showtime?.hour.price *
											bookAuth?.seatBookingList.length}
									</span>
								</div>
							</div>

							{bookAuth?.productList?.length > 0 && (
								<div style={styles.section}>
									<table>
										<thead
											style={{
												fontSize: "1.1em",
											}}
										>
											<tr>
												<th className="p-1">
													Snack
												</th>
												<th>Quantity</th>
												<th
													style={{
														width: "0.5%",
													}}
												>
													Price
												</th>
											</tr>
										</thead>
										{products?.length > 0 &&
											products
												.filter((product) =>
													bookAuth.productList.some(
														(item) =>
															product.id ==
															item
													)
												)
												.map((item, index) => (
													<tbody key={index}>
														<tr>
															<td
																style={
																	styles.sectionHeader
																}
															>
																{
																	item.name
																}
															</td>
															<td>
																<input
																	type="number"
																	className="reset-input-number"
																	name={`pQuantity[${item.id}]`}
																	min="1"
																	defaultValue={
																		1
																	}
																	placeholder="Quantity..."
																	onChange={(
																		e
																	) =>
																		handleQuantityChange(
																			e,
																			item.id
																		)
																	}
																	disabled={
																		open
																	}
																/>
															</td>
															<td>
																{item.price *
																	quantity[
																		item
																			.id
																	]}
															</td>
														</tr>
													</tbody>
												))}
									</table>
								</div>
							)}
							{/* Total Amount Section */}
							<div className="total-section" style={styles.section}>
								<div style={styles.sectionHeader}>
									<span>Total Amount</span>

									<span>{calculateTotalAmount()}</span>
								</div>
							</div>
							<div className="action-buttons">
								<Button
									type="submit"
									style={styles.confirmButton}
									aria-controls="example-collapse-text"
									aria-expanded={open}
									disabled={open}
								>
									CONFIRM
								</Button>
								<Button
									type="button"
									onClick={cancelHandeler}
									style={styles.cancelButton}
								>
									CANCEL
								</Button>
							</div>
						</form>
						<Collapse in={open} className="mt-3">
							<div
								id="example-collapse-text"
								className="bg-light p-4 rounded"
								style={styles.ticketHoldingTimeContainer}
							>
								<h4 style={styles.ticketHoldingTimeText}>
									Ticket holding time:
									<Badge bg="warning" className="ms-3">
										{minutes}:
										{remainingSeconds < 10 ? "0" : ""}
										{remainingSeconds}
									</Badge>
								</h4>
								<div>
									<h4>Payment</h4>
									<ul>
										<li>
											<VNPay
												totalAmount={calculateTotalAmount()}
											/>
										</li>
									</ul>
								</div>
							</div>
						</Collapse>
					</div>
					<div
						class="col-md-4"
						data-aos="fade-left"
						style={styles.posterContainer}
					>
						<img
							src={`http://localhost:8080/uploads/movies/${showtime?.movie.poster}`}
							alt="img"
							// class="img-thumbnail w-75 my-2"
							style={styles.poster}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
const styles = {
	container: {
		padding: "20px",
		background: "linear-gradient(to bottom, #111111, #480607)", // Nền gradient từ #111111 đến #480607
		color: "white", // Đổi toàn bộ chữ thành màu trắng
		borderRadius: "12px",
		boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
		maxWidth: "900px",
		margin: "0 auto",
	},
	header: {
		marginBottom: "20px",
	},
	movieTitle: {
		fontSize: "1.8rem",
		fontWeight: "bold",
		color: "white", // Đổi chữ thành màu trắng
	},
	locationGray: {
		fontSize: "1rem",
		color: "#CCCCCC", // Phần "AMPANG POINT - CINEMA 1" có màu xám nhạt hơn
	},
	time: {
		fontSize: "1rem",
		color: "white", // Đổi chữ thành màu trắng
	},
	row: {
		display: "flex",
		justifyContent: "space-between",
	},
	section: {
		paddingBottom: "10px",
		borderBottom: "1px solid #333",
		marginBottom: "10px",
	},
	sectionHeader: {
		display: "flex",
		justifyContent: "space-between",
		fontSize: "1.1rem",
		color: "white", // Đổi chữ thành màu trắng
	},
	contentContainer: {
		padding: "10px 20px",
		backgroundColor: "#222", // Nền tối cho phần nội dung chính
		color: "white",
		borderRadius: "8px",
	},
	confirmButton: {
		backgroundColor: "#b22222",
		border: "none",
		width: "100%",
		padding: "10px",
		fontSize: "1.1rem",
		marginTop: "20px",
		borderRadius: "8px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
		transition: "background-color 0.3s ease",
	},
	cancelButton: {
		backgroundColor: "gray",
		border: "none",
		width: "100%",
		padding: "10px",
		fontSize: "1.1rem",
		marginTop: "10px",
		borderRadius: "8px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
	},
	countdownBadge: {
		backgroundColor: "red", // Màu nền đếm giờ là đỏ
		color: "white", // Màu chữ trắng
		padding: "5px 10px",
		borderRadius: "4px",
	},
	posterContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	poster: {
		width: "100%",
		borderRadius: "12px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
		transition: "transform 0.3s ease",
	},
	ticketHoldingTimeContainer: {
		backgroundColor: "#111111", // Nền màu đen cho phần "Ticket holding time"
		padding: "10px",
		borderRadius: "8px",
		color: "white",
	},
	ticketHoldingTimeText: {
		color: "black", // Đổi màu chữ của "Ticket Holding Time" sang màu trắng
	},
};

export default CheckOut2;
