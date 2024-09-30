import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { format } from "date-fns";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import ModalMovieTrailer from "../../homePage/movies/ModalMovieTrailer";

function ModalMovie(props) {
	const [modalShow, setModalShow] = React.useState(false);
	let { movie } = props;
	const [data, setData] = useState(null);
	const fetchData = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/movies/detail/${movie}`);
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [movie]);

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Detail Movie</Modal.Title>
			</Modal.Header>
			<Modal.Body className="grid-example">
				<Container>
					{data && (
						<Row>
							<Col xs={12} md={4}>
								<img
									src={`http://localhost:8080/uploads/movies/${data.poster}`}
									onError={(e) => {
										e.target.src =
											"path/to/default-image.jpg";
									}} // Set default image on error
									alt="img"
									className="w-100"
								/>
							</Col>
							<Col
								xs={6}
								md={8}
								style={{
									backgroundColor: "#CAA73A",
									borderRadius: "2%",
									overflowY: "scroll",
								}}
							>
								<p>
									Release Date:
									<span class="fw-bold text-dark">
										{format(
											data.release_date,
											"dd-MM-yyyy"
										)}
									</span>
								</p>
								<p>
									Genre:{" "}
									<span class="fw-bold text-dark">
										{data.genre}
									</span>
								</p>
								<p>
									Duration:{" "}
									<span class="fw-bold text-dark">
										{data.duration}
									</span>
								</p>
								<p>
									Director:
									<span class="fw-bold text-dark">
										{data.director}
									</span>
								</p>
								<p>
									Casts:{" "}
									<span class="fw-bold text-dark">
										{data.casts}
									</span>
								</p>
								<p>
									Description:
									<span class="fw-bold text-dark">
										{data.description}
									</span>
								</p>
								<button
									className="btn btn-outline-light btn-dark py-2 me-2"
									onClick={() => setModalShow(true)}
								>
									<i
										class="fa-brands fa-youtube me-2"
										style={{ color: "#ff0000" }}
									></i>
									TRAILER
								</button>
								<ModalMovieTrailer
									traileId={data.id}
									show={modalShow}
									onHide={() => setModalShow(false)}
								/>
							</Col>
						</Row>
					)}
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalMovie;
