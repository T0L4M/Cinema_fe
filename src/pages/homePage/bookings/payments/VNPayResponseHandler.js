import React, { useContext, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { sha512 } from "js-sha512";
import axios from "axios";
import { DataContext } from "../../../../contexts/DataContext";
import { useNavigate } from "react-router-dom";

function VNPayResponseHandler(props) {
	const queryParams = queryString.parse(window.location.search);
	const vnp_HashSecret = "BEE0W9FW8QFF8OOAK3DMVW331HLY7TSD";
	//UseContext
	const { auth, orderAuth, alert, showAlert, bookingDelete, orderDelete } =
		useContext(DataContext);
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
					amount: queryParams.vnp_Amount,
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
		<div>
			{remainingSeconds < 10 ? "0" : ""}
			{remainingSeconds}
		</div>
	);
}

export default VNPayResponseHandler;
