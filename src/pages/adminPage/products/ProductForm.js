import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

const schema = yup
	.object()
	.shape({
		name: yup
			.string()
			.min(2, "Greater than 2 characters")
			.max(100, "Less than 100 characters")
			.required(),
		price: yup
			.number()
			.min(10000, "Greater than 10.000 VND")
			.max(1000000, "Less than 1.000.000 VND")
			.required(),
		status: yup.boolean().required(),
		type: yup.string().oneOf(["food", "drink"]).required(),
		image: yup.mixed().test("image", "You need to provide a file", (value) => {
			if (value.length > 0) {
				return true;
			}
			return false;
		}),
	})
	.required();

function ProductForm(props) {
	const navigate = useNavigate();
	const { showAlert } = useContext(DataContext);
	const [formattedReleaseDate, setFormattedReleaseDate] = useState("");
	const [existingPoster, setExistingPoster] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const { id } = useParams();
	//UseEffect
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				try {
					const response = await axios.get(
						`http://localhost:8080/products/detail/${id}`
					);
					const product = response.data.data;
					setValue("name", product.name);
					setValue("type", product.type);
					setValue("price", product.price);
					setValue("status", product.status);
					setExistingPoster(product.image);
				} catch (error) {
					console.error(error);
				}
			}
		};
		fetchData();
		AOS.init();
	}, [id]);

	function handleDateChange(e) {
		const selectedDate = new Date(e.target.value);
		const formattedDate = format(selectedDate, "yyyy-MM-dd");
		setFormattedReleaseDate(formattedDate);
	}

	function onSubmit(data) {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("type", data.type);
		formData.append("price", data.price);
		formData.append("status", data.status);
		formData.append("image", data.image[0] == null ? "" : data.image[0]);

		if (existingPoster != null) {
			axios.put(`http://localhost:8080/products/edit/${id}`, formData)
				.then((res) => {
					if (res.status == 200) {
						showAlert("success", "UPDATE Products SUCCESSFULLY!");
						navigate(-1);
					}
				})
				.catch((err) => console.log(err));
		}
		axios.post("http://localhost:8080/products", formData)
			.then((res) => {
				if (res.status == 200) {
					showAlert("success", "CREATE Products SUCCESSFULLY!");
					navigate(-1);
				}
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="container mt-3" data-aos="fade">
			<h2>Product Insert Form</h2>

			<form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
				<div className="row">
					<div className="mb-3 col-md-6">
						<label for="name">
							<strong>
								Name<red>*</red>
							</strong>
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							placeholder="Enter Product Name"
							{...register("name")}
						/>
						<span className="text-danger">{errors.name?.message}</span>
					</div>
					<div className="mb-3 col-md-6">
						<label for="price">
							<strong>
								Price<red>*</red>
							</strong>
						</label>
						<input
							type="text"
							className="form-control"
							id="price"
							placeholder="Enter Product Price"
							{...register("price")}
						/>
						<span className="text-danger">{errors.price?.message}</span>
					</div>
				</div>

				<div className="row">
					{existingPoster != null && (
						<div className="mb-3">
							<label htmlFor="oldPoster">Present Poster</label>
							<img
								src={`http://localhost:8080/uploads/products/${existingPoster}`}
								alt="oldPoster"
								className="img-thumbnail"
								width="100"
							/>
						</div>
					)}
					<div className="mb-3">
						<label htmlFor="image">
							Image<span className="text-danger">*</span>
						</label>
						<input
							type="file"
							className="form-control"
							id="image"
							{...register("image")}
						/>
						<span className="text-danger">{errors.image?.message}</span>
					</div>

					<div className="mb-3 col-md-4">
						<span>
							Status<span className="text-danger">*</span>
						</span>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input"
								id="selling"
								{...register("status")}
								value="true"
							/>
							<label className="form-check-label" htmlFor="selling">
								Selling
							</label>
						</div>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input"
								id="stopped"
								{...register("status")}
								value="false"
							/>
							<label className="form-check-label" htmlFor="stopped">
								Stop Selling
							</label>
						</div>
						<span className="text-danger">{errors.status?.message}</span>
					</div>
					<div className="mb-3 col-md-4">
						<strong>
							Type<red>*</red>
						</strong>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input"
								id="food"
								value="food"
								{...register("type")}
							/>
							<label className="form-check-label" for="food">
								Food
							</label>
						</div>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input"
								id="drink"
								value="drink"
								{...register("type")}
							/>
							<label className="form-check-label" for="drink">
								Drink
							</label>
						</div>
						<span className="text-danger">{errors.type?.message}</span>
					</div>
				</div>
				<button type="submit" className="btn btn-primary" data-aos="zoom-in-right">
					Submit
				</button>
			</form>
		</div>
	);
}

export default ProductForm;
