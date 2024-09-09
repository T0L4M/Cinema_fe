import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductList(props) {
	//Nhan Product nhé
	const [data, setData] = useState([]);
	//Lấy alert nè :3
	const { alert } = useContext(DataContext);
	//Nhay trang nà 0_0
	// const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/products");
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
	return (
		<div className="container mt-3">
			<h2>Products Table</h2>

			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}

			<Link className="btn btn-primary mb-3" to={"./new"}>
				<b>Insert New Product</b>
			</Link>
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
						<th>ID</th>
						<th>Name</th>
						<th>Image</th>
						<th>Type</th>
						<th>Price</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 &&
						currentItems.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>
										<img
											src={`http://localhost:8080/uploads/products/${item.image}`}
											onError={(e) => {
												e.target.src =
													"path/to/default-image.jpg";
											}} // Set default image on error
											alt="img"
											className="img-thumbnail"
											width="100"
										/>
									</td>
									<td>{item.type}</td>
									<td>{item.price}</td>
									<td>
										{item.status
											? "Selling"
											: "Stop Selling"}
									</td>
									<td>
										<Link className="btn btn-success me-2">
											<b>Edit</b>
										</Link>

										<Link className="btn btn-danger">
											<b>Delete</b>
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

export default ProductList;
