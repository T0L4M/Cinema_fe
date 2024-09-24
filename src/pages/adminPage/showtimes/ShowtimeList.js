import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { Alert, Form } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { Modal, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

function ShowtimeList(props) {
	//Nhan Showtime_tb
	const [data, setData] = useState([]);
	//Lay Alert
	const { alert } = useContext(DataContext);
	//Nhay trang
	// const navigate = useNavigate();
	const [searchType, setSearchType] = useState("");

	//search
	const [listsearch, setListSearch] = useState([]);
	function handelSearch(e) {
		let { value } = e.target;
		let res = [];
		if (value === "" || searchType === "") {
			setListSearch(data);
		} else if (value != "") {
			if (searchType == "title") {
				console.log("HELLO");

				for (let i = 0; i < data.length; i++) {
					console.log("xcxzcz" + data[i]);

					if (data[i].movie.title.toLowerCase().includes(value.toLowerCase())) {
						res.push(data[i]);
					}
				}
			} else if (searchType == "showtime_date") {
				for (let i = 0; i < data.length; i++) {
					if (
						data[i].showtime_date
							.toLowerCase()
							.includes(value.toLowerCase())
					) {
						res.push(data[i]);
					}
				}
			} else if (searchType == "hour") {
				for (let i = 0; i < data.length; i++) {
					if (
						data[i].hour.time_from
							.toLowerCase()
							.includes(value.toLowerCase())
					) {
						res.push(data[i]);
					}
				}
			} else if (searchType == "auditoria") {
				for (let i = 0; i < data.length; i++) {
					if (
						data[i].auditoria.name
							.toLowerCase()
							.includes(value.toLowerCase())
					) {
						res.push(data[i]);
					}
				}
			}
			setListSearch(res.length > 0 ? res : [""]);
		}
	}
	/////////////////////////////////////

	function onChangeTypeForSearch(e) {
		let { value } = e.target;
		setSearchType(value);
	}

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/showtimes");
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
		setCurrentItems(
			listsearch.length > 0
				? listsearch.slice(itemOffset, endOffset)
				: data.slice(itemOffset, endOffset)
		);
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data, listsearch]);
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};
	//END PAGINATE

	return (
		<div className="container mt-3">
			<h2>Showtimes Table</h2>
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}

			<Link className="btn btn-outline-primary mt-3 mb-3" to={"./new"}>
				<b>Insert New Showtime</b>
			</Link>

			<div class="input-group mt-3 mb-3 float-end w-50">
				<Form.Select
					className="btn btn-outline-success"
					onChange={onChangeTypeForSearch}
				>
					<option value="">Select Type For Search</option>
					<option value="title">Movie Title</option>
					<option value="showtime_date">Showtime Date</option>
					<option value="hour">Hour</option>
					<option value="auditoria">Auditoria</option>
				</Form.Select>
				<input
					className="form-control"
					id="search"
					placeholder="Enter Name to Search"
					disabled={searchType == ""}
					onChange={handelSearch}
					// value={searchType == "" ? "" : }
				/>
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
						<th>Showtime Date</th>
						<th>Movie</th>
						<th>Auditoria</th>
						<th>Hour</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 &&
						listsearch[0] != "" &&
						currentItems.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.id}</td>
									<td>{item.showtime_date}</td>
									<td>{item.movie.title}</td>
									<td>{item.auditoria.name}</td>
									<td>
										{item.hour.time_from} - {item.time_to}
									</td>

									<td>
										{item.status ? (
											<i
												className="fa-solid fa-circle-check"
												style={{ color: "#63E6BE" }}
											></i>
										) : (
											<i
												className="fa-solid fa-xmark"
												style={{ color: "#fb0909" }}
											></i>
										)}
									</td>
									<td>
										<Link
											type="button"
											className="btn btn-outline-light"
											to={``}
										>
											<b>Detail</b>
										</Link>
										<Link
											className="btn btn-outline-success"
											to={`./new/${item.id}`}
											state={{ showtimeData: item }}
										>
											<b>Edit</b>
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

export default ShowtimeList;
