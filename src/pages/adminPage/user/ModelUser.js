import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

function ModalUser(props) {
	let { user } = props;
	const [data, setData] = useState([]);

	const location = useLocation();
	const [paymentData, setPaymentData] = useState(location.state?.paymentData || {});
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
	const [product, setProduct] = useState([]);
	const fetchData = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/payments/detail/${user}`);
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA ", error);
		}
	};
	useEffect(() => {
		fetchData();
		if (paymentData?.order != null) {
			fetchProduct(paymentData.order.id);
		}
	});

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">The Showing</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* LOADER SPINNER */}
				{data.length == 0 && (
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
				<table className="table table-striped table-dark">
					<thead>
						<tr>
							<th>UserName</th>
							<th>Movie</th>
							<th>Products and Quantities</th>
							<th>Amount</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 &&
							data.map((item, index) => {
								return (
									<tr key={index}>
										<td>
											{item.booking.customer.userName}
										</td>
										<td>
											{
												item.booking.showtime.movie
													.title
											}
										</td>
										<td>
											{product.length > 0 &&
												product[0].product.name}
											,
											{product.length > 0 &&
												product[0].product_quantity}
										</td>
										<td>{item.amount}</td>
										<td>
											{format(
												item.created_at,
												"dd-MM-yyyy"
											)}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalUser;
