import React, { useContext, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { sha512 } from "js-sha512";
import axios from "axios";
import { DataContext } from "../../../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

function VNPayResponseHandler(props) {
	const queryParams = queryString.parse(window.location.search);
	const vnp_HashSecret = "BEE0W9FW8QFF8OOAK3DMVW331HLY7TSD";
	//UseContext
	const { auth, orderAuth, alert, showAlert, bookingDelete, orderDelete } =
		useContext(DataContext);
	const navigate = useNavigate();
	//timing
	const [seconds, setSeconds] = useState(10);

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
				if (result) {
					submitDataMemo();
				}
				bookingDelete();
				orderDelete();
				navigate("/");
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [seconds]);

	return (
		<div
			className="w-75 mx-auto"
			style={{ backgroundColor: "#CAA73A", borderRadius: "2%" }}
			// data-aos="flip-left"
		>
			<div className="container">
				<div className="header mt-2 text-center">
					<h4 style={{ textTransform: "uppercase" }}>Transaction Report</h4>
				</div>

				<div className="below">
					<p>
						Result:
						<span>
							{result
								? "Your Payment Was Successful!"
								: " Your Payment Could Not Be Processed"}
						</span>
					</p>
					<p>
						<span>
							{result
								? "We're pleased to inform you that your payment has been successfully processed. <br />You can view your order details and status in your account.<br /> Thank you for your purchase!"
								: "We regret to inform you that your payment could not be processed. <br /> Please review your payment information and try again. <br />If the issue persists, please contact our customer support team.<br /> We apologize for any inconvenience this may cause."}
						</span>
					</p>
				</div>

				<div className="pb-3">
					<label className="fs-4 me-3">
						<Badge bg="light" text="dark">
							Back To HomePage After:
						</Badge>
					</label>
					<span className="fs-5 text-dark">
						{remainingSeconds < 10 ? "0" : ""}
						{remainingSeconds}
					</span>
				</div>
			</div>
		</div>
	);
}

export default VNPayResponseHandler;
