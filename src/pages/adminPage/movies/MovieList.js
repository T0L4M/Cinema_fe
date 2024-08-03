import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";

function MovieList(props) {
	const [data, setData] = useState([]);
	const { alert } = useContext(DataContext);
	// const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:8080/movies");
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
			<h2>Movies Table</h2>
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
			<Link className="btn btn-primary mb-3" to={"./new"}>
				<b>Insert New Movie</b>
			</Link>
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
			<table className="table table-striped table-dark">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Genre</th>
						<th>Director</th>
						<th>Casts</th>
						<th>Release Date</th>
						<th>Poster</th>
						<th>Description</th>
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
									<td>{item.title}</td>
									<td>{item.genre}</td>
									<td>{item.director}</td>
									<td>
										<span
											className="d-inline-block"
											dangerouslySetInnerHTML={{
												__html:
													item.casts?.slice(
														0,
														200
													) || "",
											}}
										/>
										{item.casts?.length > 200 && "..."}
									</td>
									<td>{item.release_date}</td>
									<td>
										<img
											src={`http://localhost:8080/uploads/movies/${item.poster}`}
											onError={(e) => {
												e.target.src =
													"path/to/default-image.jpg";
											}} // Set default image on error
											alt="img"
											className="img-thumbnail"
											width="100"
										/>
									</td>
									<td>
										<span
											className="d-inline-block"
											dangerouslySetInnerHTML={{
												__html:
													item.description?.slice(
														0,
														200
													) || "",
											}}
										/>
										{item.description?.length > 200 &&
											"..."}
									</td>
									<td>{item.status}</td>
									<td>
										<button
											type="button"
											className="btn btn-light mb-1 w-100"
											data-bs-toggle="modal"
											data-bs-target="#{{ $item -> movie_id }}"
										>
											<b>Detail</b>
										</button>
										<Link
											className="btn btn-success mb-1 w-100"
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
