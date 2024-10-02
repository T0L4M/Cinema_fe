import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import AOS from "aos";

function HourList(props) {
	//Nhan Hour nhé
	const [data, setData] = useState([]);
	//Lay Alert
	const { alert } = useContext(DataContext);
	//Nhay trang
	// const navigate = useNavigate();

	//search
	const [search, setSearch] = useState("");
	const [listsearch, setListSearch] = useState([]);
	function handelSearch(e) {
		let { value } = e.target;
		if (value != "") {
			let res = data.filter((i) =>
				i.time_from.toLowerCase().includes(value.toLowerCase())
			);
			setSearch(value);
			setListSearch(res);
		} else {
			setSearch(value);
		}
	}

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/hours");
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	//sort by price
	function handeSortPrice(num) {
		let result = data.sort(function (a, b) {
			if (num == 1) {
				return a.tim - b.price;
			} else if (num == 0) {
				return b.price - a.price;
			}
		});
		setData([...result]);
	}

	useEffect(() => {
		fetchData();
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
		setCurrentItems(
			listsearch.length > 0
				? listsearch.slice(itemOffset, endOffset)
				: data.slice(itemOffset, endOffset)
		);
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};
	//END PAGINATE
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div className="mt-3">
			<h2>Hour Table</h2>
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
			<Link className="btn btn-primary mb-3" to={"./new"}>
				<b>Insert New Hour</b>
			</Link>
			<div class="input-group mt-3 mb-3 float-end" style={{ width: "fit-content" }}>
				<a onClick={() => handeSortPrice(1)} className="btn btn-outline-info">
					<i
						className="fa-solid fa-circle-up me-2"
						style={{ color: " #63E6BE;" }}
					></i>
					<strong>Time</strong>
				</a>
				<a onClick={() => handeSortPrice(0)} className="btn btn-outline-success">
					<i
						className="fa-solid fa-circle-down me-2"
						style={{ color: "#63E6BE" }}
					></i>
					Time
				</a>
			</div>
			{/* LOADER SPINNER */}
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
			{/* END LOADER SPINNER */}

			<table className="table table-striped table-dark" data-aos="fade">
				<thead>
					<tr>
						<th>ID</th>
						<th>Price</th>
						<th>Time_Form</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 &&
						(search != "" ? listsearch : currentItems)
							.slice()
							.sort((a, b) => b.id - a.id)
							.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.id}</td>
										<td>{item.price}</td>
										<td>{item.time_from}</td>
										<td>
											<Link
												to={`/admin/hour/new/${item.id}`}
												state={{ hourData: item }}
											>
												<button className="btn btn-outline-warning">
													Edit
												</button>
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

export default HourList;
