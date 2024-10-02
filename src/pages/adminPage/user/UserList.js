import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
// import ModalAuditoria from "./ModalAuditoria";

function UserList(props) {
	//Nhan User_tb
	const [data, setData] = useState([]);
	//auditoria
	// const [auditoria, setAuditoria] = useState([]);
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
				i.userName.toLowerCase().includes(value.toLowerCase())
			);
			setSearch(value);
			setListSearch(res);
		} else {
			setSearch(value);
		}
	}

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/accounts");
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};
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
	const [modalShow, setModalShow] = useState(false);
	return (
		<div className="mt-3">
			<h2>Users Table</h2>
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
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
					<input
						className="form-control mt-2 mb-2"
						id="search"
						placeholder="Enter Name to Search"
						onChange={handelSearch}
					/>
					<tr>
						<th>ID</th>
						<th>UserName</th>
						<th>Email</th>
						<th>Gender</th>
						<th>Phone</th>
						<th>DoB</th>
						<th>Address</th>
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
										<td>{item.userName}</td>
										<td>{item.email}</td>
										<td>{item.gender}</td>
										<td>{item.phone}</td>
										<td>{item.dob}</td>
										<td>{item.address}</td>
										<td>
											<Link
												className="btn btn-success mb-1 w-100"
												to={`./detail/${item.id}`}
												state={{
													paymentData: item,
												}}
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

export default UserList;
