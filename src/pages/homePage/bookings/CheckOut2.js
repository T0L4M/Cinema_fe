import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { Badge, Button, Collapse } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import VNPay from "./payments/VNPay";

function CheckOut2(props) {
	const { bookAuth, bookingDelete, showAlert, auth, orderSaving } = useContext(DataContext);
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
	const [seconds, setSeconds] = useState(300);
	const navigate = useNavigate();

	const handleData = async () => {
		if (bookAuth != null) {
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
			setOpen(!open);
			setIsCountingDown(true);
			if (data.productList.length > 0) {
				orderSaving(response.data.data);
			}
		} else {
			console.log("FAIL!!!!");
		}
	}

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	useEffect(() => {
		if (isCountingDown) {
			const intervalId = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1);
				} else {
					clearInterval(intervalId);
					// Handle countdown completion (e.g., cancel booking)
					// ... your cancelBooking logic here
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
		if (bookAuth == null) {
			showAlert("danger", "Something went wrong!");
			navigate("/");
		}

		const converted = convertSeats(bookAuth?.seatBookingList);
		setConvertedSeats(converted.length > 0 ? converted.split(" ") : []);
		handleData();
	}, []);

	return (
		<div class="container">
			<header>
				<p>
					Thank you for choosing <strong>FIN CINEMA</strong>! <br />
					Please check your booking information
				</p>
			</header>
			{/* LOADER SPINNER */}
			{showtime == null && (
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
			{showtime != null && (
				<div class="row">
					<div className="col-md-8">
						<form onSubmit={handleSubmit}>
							<div className="row mb-3">
								<div className="col-6">
									<div class="form-group">
										<label className="fs-4 me-3">
											<Badge bg="light" text="dark">
												Member
											</Badge>
										</label>
										<span className="fs-5 text-dark">
											{auth?.userName}
										</span>
									</div>
									<div class="form-group">
										<label className="fs-4 me-3">
											<Badge bg="light" text="dark">
												Showtime
											</Badge>
										</label>
										<span className="fs-5 text-dark">
											{showtime?.movie.title +
												" - " +
												showtime?.hour.time_from}
										</span>
									</div>
									<div class="form-group">
										<label className="fs-4 me-3">
											<Badge bg="light" text="dark">
												Seats
											</Badge>
										</label>
										{convertedSeats.map((seat, index) => (
											<span className="fs-5 text-dark">
												{seat}
											</span>
										))}
									</div>
									<div class="row">
										<div class="form-group col-md-12">
											<label className="fs-4 me-3">
												<Badge
													bg="light"
													text="dark"
												>
													Ticket Price
												</Badge>
											</label>
											<span className="fs-5 text-dark">
												{showtime?.hour.price +
													" x " +
													bookAuth
														?.seatBookingList
														?.length}
											</span>
										</div>
									</div>
								</div>
								{bookAuth?.productList?.length > 0 && (
									<div className="col-6">
										<table>
											<thead
												style={{
													backgroundColor:
														"rgb(255, 255, 255)",
													color: "black",
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
													.map(
														(
															item,
															index
														) => (
															<tbody
																key={
																	index
																}
															>
																<tr>
																	<td className="text-dark fs-5">
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
														)
													)}
										</table>
									</div>
								)}
								<div className="form-group">
									<label className="fs-4 me-3">
										<Badge bg="light" text="dark">
											Total Amount
										</Badge>
									</label>
									<span className="fs-5 text-dark">
										{calculateTotalAmount()}
									</span>
								</div>
							</div>
							<button
								type="submit"
								class="btn btn-success me-2"
								aria-controls="example-collapse-text"
								aria-expanded={open}
								disabled={open}
							>
								CONFIRM
							</button>
							<button
								type="button"
								class="btn btn-danger"
								onClick={() => {
									if (
										window.confirm(
											"Back to the showtime page?"
										)
									) {
										bookingDelete();
									}
								}}
							>
								CANCEL
							</button>
						</form>
						<Collapse in={open} className="mt-3">
							<div
								id="example-collapse-text"
								className="bg-light p-5 rounded text-dark"
							>
								<h4>
									Ticket holding time:
									<Badge
										bg="warning"
										text="dark"
										className="ms-3"
									>
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
					<div class="col-md-4">
						<img
							src={`http://localhost:8080/uploads/movies/${showtime?.movie.poster}`}
							alt="img"
							class="img-thumbnail w-75 my-2"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default CheckOut2;
