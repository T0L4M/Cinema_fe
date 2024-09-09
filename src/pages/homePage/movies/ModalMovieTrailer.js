import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";

function ModalMovieTrailer(props) {
	const [data, setData] = useState({});
	const { id } = useParams();

	const fetchData = async () => {
		const url = `http://localhost:8080/movies/detail/${id}`;

		try {
			const response = await axios.get(url);
			setData(response.data.data);
		} catch (error) {
			console.log("Error FETCHING DATA: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* LOADER SPINNER */}
				{Object.keys(data).length == 0 && (
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
				{Object.keys(data).length > 0 && (
					<div>
						<iframe
							width={"100%"}
							height={"500rem"}
							src={data.trailer}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
						></iframe>
					</div>
				)}
			</Modal.Body>
		</Modal>
	);
}

export default ModalMovieTrailer;
