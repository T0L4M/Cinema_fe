import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";

const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

//YUP
const schema = yup
	.object()
	.shape({
		price: yup
			.number()
			.typeError("Price must be number!")
			.required("Price cannot be blank!")
			.min(10000, "Price must be greater than 10.000 VNĐ!")
			.max(100000, "Price must be less than 100.000 VNĐ!"),

		time_from: yup
			.string()
			.matches(timeRegex, "Invalid time format (HH:mm:ss)")
			.required("Time from is required"),

		time_to: yup
			.string()
			.matches(timeRegex, "Invalid time format (HH:mm:ss)")
			.required("Time to is required")
			.test("time-range", "Time from must be before time to", function (value) {
				const { time_from, time_to } = this.parent;
				// Convert time strings to Date objects for comparison
				const timeFromObj = new Date(`1970-01-01 ${time_from}`);
				const timeToObj = new Date(`1970-01-01 ${time_to}`);
				return timeFromObj < timeToObj;
			}),
	})
	.required();

function HourForm(props) {
	const { id } = useParams();
	const location = useLocation();
	const [hourData, setHourData] = useState(location.state?.hourData || {});
	const { showAlert } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: hourData,
	});
	const navigate = useNavigate();

	//onSubmit
	async function onSubmit(data) {
		const url = id
			? `http://localhost:8080/hours/edit/${id}`
			: "http://localhost:8080/hours";
		const method = id ? "PUT" : "POST";
		await axios({
			method,
			url,
			data,
		})
			.then((res) => {
				if (res.status === 200) {
					showAlert(
						"success",
						id ? "UPDATE HOUR SUCCESSFULLY!" : "INSERT HOUR SUCCESSFULLY!"
					);
					navigate(-1);
				}
			})
			.catch((error) => console.log("Error API ", method, ": ", error));
	}
	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				const response = await axios.get(
					`http://localhost:8080/hours/detail/${id}`
				);
				setHourData(response.data.data);
			};
			fetchData();
		}
		AOS.init();
	}, [id]);

	return (
		<div className="container mt-3" data-aos="fade">
			<h2>Hour Insert Form</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3 mt-3">
					<label for="time_from">
						Time From<red>*</red>
					</label>
					<input
						type="time"
						step={1}
						className="form-control"
						id="time_from"
						placeholder="Enter Time From"
						{...register("time_from")}
					/>
					<span className="text-danger">{errors.time_from?.message}</span>
				</div>

				<div className="mb-3">
					<label for="time_to">
						Time To<red>*</red>
					</label>
					<input
						type="time"
						step={1}
						className="form-control"
						id="time_to"
						placeholder="Enter Time To"
						{...register("time_to")}
					/>
					<span className="text-danger">{errors.time_to?.message}</span>
				</div>

				<div className="mb-3">
					<label for="price">
						Price<red>*</red>
					</label>
					<input
						type="text"
						className="form-control"
						id="price"
						placeholder="Enter Price"
						{...register("price")}
					/>
					<span className="text-danger">{errors.price?.message}</span>
				</div>

				<button type="submit" className="btn btn-primary" data-aos="zoom-in-right">
					Submit
				</button>
			</form>
		</div>
	);
}

export default HourForm;
