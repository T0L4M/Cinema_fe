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

	const { id } = useParams();
	const [product, setProduct] = useState([]);

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

	useEffect(() => {
		console.log("ORDER: ", paymentData.order);

		if (paymentData.order != null) {
			fetchProduct(paymentData.order.id);
		}
		AOS.init();
	}, []);
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
									<span>{paymentData.booking.seatBooking}</span>
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
