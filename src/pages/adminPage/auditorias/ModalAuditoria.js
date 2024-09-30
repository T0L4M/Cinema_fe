import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";

function ModalAuditoria(props) {
	let { room } = props;
	const [data, setData] = useState([]);
	const fetchData = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/showtimes/room/${room}`);
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA ", error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	console.log("DATA:", room);

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
							<th>Showtime</th>
							<th>Date</th>
							<th>Movie</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 &&
							data.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.hour.time_from}</td>
										<td>{item.showtime_date}</td>
										<td>{item.movie.title}</td>
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

export default ModalAuditoria;
