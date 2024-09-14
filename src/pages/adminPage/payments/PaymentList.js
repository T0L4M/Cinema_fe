import React, { useContext, useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { format } from "date-fns";

function PaymentList(props) {
	const [data, setData] = useState([]);
	const { alert } = useContext(DataContext);
	// const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/payments");
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	useEffect(() => {
		fetchData();
		AOS.init();
	}, []);

	//PAGINATE
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 5;
	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(data.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};
	//END PAGINATE

	return (
		<div className="mt-3">
			<h2>Payment List</h2>
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
			{data.length == 0 && (
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
			<table className="table table-striped table-dark" data-aos="fade">
				<thead>
					<tr>
						<th>UserName</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 &&
						currentItems.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.booking.customer.userName}</td>
									<td>{item.amount}</td>
									<td>
										{format(item.created_at, "dd-MM-yyyy")}
									</td>
									<td>
										<Link
											className="btn btn-success mb-1 w-100"
											to={`./detail/${item.id}`}
											state={{ paymentData: item }}
										>
											<b>Detail</b>
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			<ReactPaginate
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel="< previous"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				renderOnZeroPageCount={null}
			/>
		</div>
	);
}

export default PaymentList;
