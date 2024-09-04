import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { sha512 } from "js-sha512";

function VNPayResponseHandler(props) {
	//DATA
	const [payment, setPayment] = useState({
		amount: 0,
		bookingId: "",
		orderId: "",
	});

	const queryParams = queryString.parse(window.location.search);
	const vnp_HashSecret = "BEE0W9FW8QFF8OOAK3DMVW331HLY7TSD";

	function calculateSecureHash(queryParameters, vnp_HashSecret) {
		const sortedParams = Object.assign({}, queryParameters);
		delete sortedParams.vnp_SecureHash;
		const hmac = sha512.hmac.create(vnp_HashSecret);
		hmac.update(queryString.stringify(sortedParams));
		const secureHash = hmac.hex();
		return secureHash;
	}

	useEffect(() => {
		// Calculate secure hash
		const calculatedHash = calculateSecureHash(queryParams, vnp_HashSecret);
		console.log("queryParams", queryParams);
		console.log("calculatedHash", calculatedHash);

		if (
			calculatedHash === queryParams.vnp_SecureHash &&
			queryParams.vnp_ResponseCode === "00"
		) {
			// Payment successful
			console.log("SUCCESSFULLY PAYMENT");
			// queryParams.vnp_Amount;
		} else {
			// Payment failed
			console.log("PAYMENT FAIL");

			// Handle payment failure (e.g., display an error message)
		}
	}, []);

	return <div></div>;
}

export default VNPayResponseHandler;
