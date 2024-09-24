import React, { useContext, useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link, useLocation, useParams } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

function PaymentDetail(props) {
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
			console.log("ERROR FEYCHING DATA: ", error);
		}
	};

	const fetchProduct = async (orderId) => {
		try {
			const response = await axios.get(
				`http://localhost:8080/order_details/detail/${orderId}`
			);
			setProduct(response.data.data);
		} catch (error) {
			console.log("ERROR FEYCHING DATA: ", error);
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
			console.log("PAYMENT:", paymentData);
			const converted = convertSeats(paymentData?.booking?.seatBooking);
			setConvertedSeats(converted.length > 0 ? converted.split(" ") : []);

			if (paymentData?.order != null) {
				fetchProduct(paymentData.order.id);
			}
		}

		AOS.init();
	});
	console.log("PRODUCT: ", product);

	return (
		<div className="container">
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
				<div className="row">
					<div
						className="col-md-8"
						style={{ backgroundColor: "#CAA73A", borderRadius: "2%" }}
						data-aos="flip-left"
					>
						<div className="container">
							<div className="header mt-2">
								<h4 style={{ textTransform: "uppercase" }}>
									{paymentData.booking.customer.userName}
								</h4>
							</div>
							<div className="below">
								<p>
									Seat:
									{convertedSeats.length == 0 && (
										<p>is Loading</p>
									)}
									{convertedSeats.map((seat, index) => (
										<span key={index}>{seat}</span>
									))}
								</p>
								Order:
								<ol>
									{product.length > 0 &&
										product.map((item, index) => {
											return (
												<li key={index}>
													Tên sản phẩm:{" "}
													<span>
														{
															item
																.product
																.name
														}
													</span>
													; Số Lượng:
													<span>
														{
															item.product_quantity
														}
													</span>
												</li>
											);
										})}{" "}
								</ol>
								<p>
									Date:{" "}
									<span>
										{
											paymentData.booking.showtime
												.showtime_date
										}
									</span>
								</p>
								<p>
									Movie:{" "}
									<span>
										{
											paymentData.booking.showtime.movie
												.title
										}
									</span>
								</p>
								<p>
									Auditoria:{" "}
									<span>
										{
											paymentData.booking.showtime
												.auditoria.name
										}
									</span>
								</p>
								<p>
									Time_From:{" "}
									<span>
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
