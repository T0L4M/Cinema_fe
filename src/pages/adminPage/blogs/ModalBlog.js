import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { format } from "date-fns";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

function ModalBlog(props) {
	const [modalShow, setModalShow] = React.useState(false);
	let { blog } = props;
	const [data, setData] = useState(null);
	const fetchData = async () => {
		try {
			const response = await axios.get(`http://localhost:8080/blogs/detail/${blog}`);
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [blog]);

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Detail Blog</Modal.Title>
			</Modal.Header>
			<Modal.Body className="grid-example">
				<Container>
					{data && (
						<Row>
							<Col xs={12} md={4}>
								<img
									src={`http://localhost:8080/uploads/blogs/${data.thumbnail}`}
									onError={(e) => {
										e.target.src =
											"path/to/default-image.jpg";
									}} // Set default image on error
									alt={data.title}
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
										{format(data.created_at, "dd-MM-yyyy")}
									</span>
								</p>
								<p>
									Title:{" "}
									<span class="fw-bold text-dark">
										{data.title}
									</span>
								</p>
								<p>
									Content:
									<span
										className="d-inline-block"
										dangerouslySetInnerHTML={{
											__html:
												data.content?.slice(
													0,
													200
												) || "",
										}}
									>
										{data.content?.length > 200 && "..."}
									</span>
								</p>
								<p>
									Status:
									<span class="fw-bold text-dark">
										{data.status ? "Active" : "Inactive"}
									</span>
								</p>
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

export default ModalBlog;
