import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AuditoriaDetail(props) {
	const { id } = useParams();
	const [room, setRoom] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				try {
					const response = await axios.get(
						`http://localhost:8080/auditorias/detail/${id}`
					);
					setRoom(response.data.data);
				} catch (error) {
					console.error(error);
				}
			}
		};
		fetchData();
	}, [id]);
	console.log("DATA: ", room);

	return (
		<div class="map">
			<div class="screen"></div>
			<form>
				<div className="row">
					<div className="col-lg-1 d-none d-lg-block">
						<ul className="pt-5" style={{ listStyle: "none" }}>
							{Array.from({ length: room.rowNum }, (_, index) => (
								<li key={index} className="fs-2 letter">
									{String.fromCharCode(65 + index)}
								</li>
							))}
						</ul>
					</div>
					<div className="col-lg-11">
						{Array(room.colNum)
							.fill(null)
							.map((_, col) => (
								<div key={col} className="wrapper">
									{Array(room.rowNum)
										.fill(null)
										.map((_, row) => (
											<div
												key={row}
												className="custom-control custom-checkbox iconSelect"
											>
												<input
													type="checkbox"
													id={`${row + 1}x${
														col + 1
													}`} // Assuming 1-based indexing
													name="seat_check[]"
													value={`${row + 1}x${
														col + 1
													}`}
													className="custom-control-input"
												/>
												<label
													className="custom-control-label"
													htmlFor={`${
														row + 1
													}x${col + 1}`}
												>
													<i
														className="fas fa-solid fa-couch d-none d-lg-block"
														style={{
															fontSize: "1.5em",
														}}
													></i>
													<div className="mt-1">
														{col + 1}
													</div>
												</label>
											</div>
										))}
								</div>
							))}
					</div>
				</div>
			</form>
		</div>
	);
}

export default AuditoriaDetail;
