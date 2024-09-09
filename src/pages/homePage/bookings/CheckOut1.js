import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Modal } from "react-bootstrap";
import { DataContext } from "../../../contexts/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";

const CheckOut1 = () => {
	//Product Modal
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(!show);
	//For Fetching Data
	const { auth, bookingSaving, alert, showAlert } = useContext(DataContext);
	const [seatMap, setSeatMap] = useState("");
	const [showtime, setShowtime] = useState({});
	const [movie, setMovie] = useState({});
	const [room, setRoom] = useState({});
	const [product, setProduct] = useState([]);
	const { idShowtime } = useParams();
	//For Booking
	const [booking, setBooking] = useState({
		seatBookingList: [],
		productList: [],
		customerId: auth.id,
		showtimeId: parseInt(idShowtime),
	});
	const navigate = useNavigate();

	// Fetch product data
	const fetchProduct = async () => {
		try {
			const response = await axios.get("http://localhost:8080/products/selling");
			setProduct(response.data.data);
		} catch (error) {
			console.error("Error fetching product data:", error);
		}
	};

	// Fetch booked seat data
	const fetchBookedSeat = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8080/bookings/byShowtime/${idShowtime}`
			);
			const bookingData = response.data.data;
			let map = "";
			bookingData.forEach((booking) => {
				map += booking.seatBooking + " ";
			});
			setSeatMap(map);
		} catch (error) {
			console.error("Error fetching seat map data:", error);
		}
	};

	// Fetch showtime details
	const fetchData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8080/showtimes/detail/${idShowtime}`
			);
			const data = response.data.data;
			setShowtime(data);
			setMovie(data.movie);
			setRoom(data.auditoria);
		} catch (error) {
			console.error("Error fetching showtime data:", error);
		}
	};

	const handleChangeInput = (field, value) => {
		if (field === "seatBookingList") {
			// Handle checkbox selection/deselection
			const updatedList = [...booking.seatBookingList];
			const index = updatedList.indexOf(value);

			if (index !== -1) {
				// Deselect the seat
				updatedList.splice(index, 1);
			} else {
				// Select the seat
				updatedList.push(value);
			}

			setBooking({
				...booking,
				[field]: updatedList,
			});
		}

		if (field === "productList") {
			// Handle checkbox selection/deselection
			const updatedProductList = [...booking.productList];
			const index = updatedProductList.indexOf(value);

			if (index !== -1) {
				// Deselect the product
				updatedProductList.splice(index, 1);
			} else {
				// Select the product
				updatedProductList.push(value);
			}

			setBooking({
				...booking,
				[field]: updatedProductList,
			});
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();
		console.log("DATA:", booking);
		if (booking.seatBookingList.length === 0) {
			showAlert("warning", "Please Choose Your Desired Seats");
			return;
		}
		bookingSaving(booking);
	}

	useEffect(() => {
		fetchProduct();
		fetchData();
		fetchBookedSeat();
		AOS.init({
			duration: 1200,
		});
	}, [idShowtime]);

	return (
		<div className="container">
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
			<div className="map rounded-4" data-aos="fade-up">
				<div className="screen"></div>
				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-lg-1 d-none d-lg-block">
							<ul className="pt-5" style={{ listStyle: "none" }}>
								{Array.from({ length: room.rowNum }, (_, index) => (
									<li key={index} className="fs-2 letter">
										{String.fromCharCode(65 + index)}
									</li>
								))}
							</ul>
						</div>
						<div className="col-lg-11">
							{Array(room.colNum)
								.fill(null)
								.map((_, col) => (
									<div key={col} className="wrapper">
										{Array(room.rowNum)
											.fill(null)
											.map((_, row) => (
												<div
													key={row}
													className="custom-control custom-checkbox iconSelect"
												>
													<input
														type="checkbox"
														id={`${
															row + 1
														}x${col + 1}`} // Assuming 1-based indexing
														value={`${
															row + 1
														}x${col + 1}`}
														className="custom-control-input"
														disabled={seatMap.includes(
															`${
																row +
																1
															}x${
																col +
																1
															}`
														)}
														onChange={(e) =>
															handleChangeInput(
																"seatBookingList",
																e
																	.target
																	.value
															)
														}
													/>
													<label
														className="custom-control-label"
														htmlFor={`${
															row + 1
														}x${col + 1}`}
													>
														<i
															className="fas fa-solid fa-couch d-none d-lg-block"
															style={{
																fontSize: "1.5em",
															}}
														></i>
														<div className="mt-1">
															{col + 1}
														</div>
													</label>
												</div>
											))}
									</div>
								))}
						</div>
					</div>
					<div className="row mt-3 border border-light rounded ">
						<div className="col-md-4">
							<label for="email" className="text-light">
								Movie:
							</label>
							<input
								type="text"
								className="form-control"
								id="title"
								name="book_title"
								readOnly
								value={movie.title}
							/>
						</div>
						<div className="col-md-4">
							<label for="email" className="text-light">
								Date:
							</label>
							<input
								type="text"
								className="form-control"
								id="title"
								name="book_showdate"
								readOnly
								value={showtime.showtime_date}
							/>
						</div>
						<div className="col-md-4">
							<label for="email" className="text-light">
								Showtime:
							</label>
							<input
								type="text"
								className="form-control"
								id="title"
								name="book_suat"
								readOnly
								value={showtime.hour?.time_from}
							/>
						</div>
					</div>
					<div className="float-end">
						<Button variant="warning" onClick={handleShow}>
							Order snack
						</Button>

						<input
							type="submit"
							className="btn btn-info d-inline-block my-5 ms-3"
							value="Confirm"
						/>
					</div>
					<Modal show={show} onHide={handleShow} animation size="xl" scrollable>
						{/* <Modal.Header closeButton>
							<Modal.Title className="text-center">
								<p className="fw-bold fs-1 text-dark ">MENU</p>
							</Modal.Title>
						</Modal.Header> */}
						<Modal.Body>
							<p className="fw-bold ms-3 fs-2 text-dark text-center">
								MENU
							</p>

							<div style={{ textAlign: "center" }}>
								<h2 className="food-tag">
									&#127871; Popcorn &#127871;
								</h2>
							</div>
							<div className="row">
								{product.map(
									(item) =>
										item.type === "food" && (
											<div
												key={item.id}
												className="col-lg-2 col-sm-6 product-wrapper"
											>
												<input
													type="checkbox"
													id={item.id}
													value={item.id}
													className="product-input"
													onChange={(e) =>
														handleChangeInput(
															"productList",
															e.target
																.value
														)
													}
												/>
												<label
													htmlFor={item.id}
													className="product-label"
												>
													<p className="text-dark">
														{item.name}
													</p>
													<img
														src={`http://localhost:8080/uploads/products/${item.image}`}
														alt="img"
														className="img-thumbnail"
														width="100"
													/>
													<p className="text-dark">
														Price:{" "}
														{item.price}
													</p>
												</label>
											</div>
										)
								)}
							</div>
							<div style={{ textAlign: "center", marginTop: "6em" }}>
								<h2 className="drink-tag">
									&#129380; Drink &#129380;
								</h2>
							</div>
							<div className="row">
								{product.map(
									(item) =>
										item.type === "drink" && (
											<div
												key={item.id}
												className="col-lg-2 col-sm-6 product-wrapper"
											>
												<input
													type="checkbox"
													id={item.id}
													value={item.id}
													className="product-input"
													onChange={(e) =>
														handleChangeInput(
															"productList",
															e.target
																.value
														)
													}
												/>
												<label
													htmlFor={item.id}
													className="product-label"
												>
													<p className="text-dark">
														{item.name}
													</p>
													<img
														src={`http://localhost:8080/uploads/products/${item.image}`}
														alt="img"
														className="img-thumbnail"
														width="100"
													/>
													<p className="text-dark">
														Price:{" "}
														{item.price}
													</p>
												</label>
											</div>
										)
								)}
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleShow}>
								Close
							</Button>
							{/* <input
								type="submit"
								className="btn btn-info d-inline-block"
								value="Confirm"
							/> */}
						</Modal.Footer>
					</Modal>
				</form>
			</div>
		</div>
	);
};

export default CheckOut1;
