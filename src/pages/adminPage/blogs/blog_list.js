import React, { useContext, useEffect, useState } from "react";

import { Alert, Button, Dropdown, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
// import ModalMovie from "./ModalMovie";
import { se } from "date-fns/locale";

function MovieList(props) {
	const [data, setData] = useState([]);
	const [modalShow, setModalShow] = React.useState(false);
	const { alert } = useContext(DataContext);
	const [searchType, setSearchType] = useState("");
	// const navigate = useNavigate();

	//search
	const [listsearch, setListSearch] = useState([]);
	
	/////////////////////////////////////


	

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/blogs");
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
		<div className="mt-3">
			<h2>Blogs Table</h2>
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
			<Link className="btn btn-primary mb-3" to={"./new"}>
				<b>Insert New Blogs</b>
			</Link>
			<div class="input-group mt-3 mb-3 float-end w-50">
				<Form.Select
					className="btn btn-outline-success"
					
				>
				
				</Form.Select>
			
			</div>
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
						<th>Title</th>
						<th>Content</th>
						<th>Status</th>
						<th>Thumbnail</th>
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
									<td>{item.title}</td>
									<td>
									<span
										className="d-inline-block"
										dangerouslySetInnerHTML={{
											__html:
												item.content?.slice(
													0,
													200
												) || "",
										}}
									/>
									{item.content?.length > 200 && "..."}
								</td>
									<td>{item.status ? "Active" : "Inactive"}</td>
									<td><img
													src={`http://localhost:8080/uploads/blogs/${item.thumbnail}`}
													className="img-thumbnail w-100"
													alt={item.title}
												/></td>
									<td>
										<button
											className="btn btn-outline-light"
											onClick={() => setModalShow(true)}
										>
											Detail
										</button>
										{/* <ModalMovie
											movie={item.id}
											show={modalShow}
											onHide={() => setModalShow(false)}
										/> */}
										<Link
											className="btn btn-outline-success"
											to={`./new/${item.id}`}
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

export default MovieList;
