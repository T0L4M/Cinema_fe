import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";

//YUP
const schema = yup
	.object()
	.shape({
		name: yup
			.string()
			.required("Name cannot be blank!")
			.min(5, "Name must be greater than 5 characters!")
			.max(50, "Name must be less than 50 characters!"),
		rowNum: yup
			.number()
			.typeError("Row must be a number!")
			.min(5, "Row cannot be less than 5!")
			.max(15, "Row must be less than 15!")
			.integer(),
		colNum: yup
			.number()
			.typeError("Column must be a number!")
			.min(5, "Column cannot be less than 5!")
			.max(15, "Column must be less than 15!")
			.integer(),
	})
	.required();

function AuditoriaForm(props) {
	const { id } = useParams();
	const location = useLocation();
	const [auditoriaData, setAuditoriaData] = useState(location.state?.auditoriaData || {});
	const { showAlert } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: auditoriaData,
	});
	const navigate = useNavigate();

	//onSubmit
	async function onSubmit(data) {
		const url = id
			? `http://localhost:8080/auditorias/edit/${id}`
			: "http://localhost:8080/auditorias";
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
						id
							? "UPDATE AUDITORIA SUCCESSFULLY!"
							: "INSERT AUDITORIA SUCCESSFULLY!"
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
					`http://localhost:8080/auditorias/detail/${id}`
				);
				setAuditoriaData(response.data.data);
			};
			fetchData();
		}
		AOS.init();
	}, [id]);
	return (
		<div className="mt-3" data-aos="fade">
			<h2>Auditorium Insert Form</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3 mt-3">
					<label htmlFor="name">
						Name<span className="text-danger">*</span>
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						placeholder="Enter Name"
						{...register("name")}
					/>
					<span className="text-danger">{errors.name?.message}</span>
				</div>
				<div className="row">
					<div className="mb-3 col-md-6">
						<label htmlFor="row">
							Row<span className="text-danger">*</span>
						</label>
						<input
							type="number"
							className="form-control"
							id="row"
							placeholder="Enter Row"
							{...register("rowNum")}
						/>
						<span className="text-danger">{errors.rowNum?.message}</span>
					</div>
					<div className="mb-3 col-md-6">
						<label htmlFor="col">
							Column<span className="text-danger">*</span>
						</label>
						<input
							type="number"
							className="form-control"
							id="col"
							placeholder="Enter Col"
							{...register("colNum")}
						/>
						<span className="text-danger">{errors.colNum?.message}</span>
					</div>
				</div>

				<button type="submit" className="btn btn-primary" data-aos="zoom-in-right">
					Submit
				</button>
			</form>
		</div>
	);
}

export default AuditoriaForm;
