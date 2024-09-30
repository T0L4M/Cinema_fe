import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import { format, startOfDay } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";
import { Alert } from "react-bootstrap";

//YUP
const schema = yup
	.object()
	.shape({
		status: yup.boolean().required("Status cannot be blank!"),
		showtime_date: yup
			.date()
			.typeError("Invalid Date Format")
			.min(startOfDay(new Date()), "Showtime date cannot be earlier than today")
			.max(
				new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
				"Showtime date cannot be more than 1 month in the future"
			)
			.required("Showtime Date can not blank!"),
		movie_id: yup.number().required("Movie can't blank!").typeError("Movie can't blank!"),
		auditoria_id: yup
			.number()
			.required("Auditoria can not blank!")
			.typeError("Auditorium can't blank!"),
		hour_id: yup.number().required("Hour can not blank!").typeError("Hour can't blank!"),
	})
	.required();

const filterHoursByDateAndTime = (hours, selectedDate) => {
	const now = new Date();
	const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours to current time

	return hours.filter((hour) => {
		const hourDate = new Date(selectedDate.getTime());
		// Phân tích chuỗi time_from thành đối tượng Date
		const timeFrom = new Date("2024-09-05T" + hour.time_from);
		hourDate.setHours(timeFrom.getHours());
		hourDate.setMinutes(timeFrom.getMinutes());
		hourDate.setSeconds(0); // Ensure time comparison is consistent
		return hourDate >= twoHoursFromNow; // Filter hours after 2 hours from current time
	});
};

function ShowtimeForm(props) {
	const { id } = useParams();
	const location = useLocation();
	const [showtimeData, setShowtimeData] = useState(location.state?.showtimeData || {});
	// const [formattedShowtimeDate, setFormattedShowtimeDate] = useState("");
	const { showAlert, alert } = useContext(DataContext);

	const [movies, setMovies] = useState([]);
	const [hours, setHours] = useState([]);
	const [auditorias, setAuditorias] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: showtimeData,
	});
	const navigate = useNavigate();

	//onSubmit
	async function onSubmit(data) {
		data.showtime_date = selectedDate.toISOString();
		const url = id
			? `http://localhost:8080/showtimes/edit/${id}`
			: "http://localhost:8080/showtimes";
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
							? "UPDATE SHOWTIME SUCCESSFULLY!"
							: "INSERT SHOWTIME SUCCESSFULLY!"
					);
					navigate(-1);
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					showAlert(
						"warning",
						"DUPLICATED SHOWTIME DATE ON SAME ROOM OR HOUR!!"
					);
				} else {
					console.log("Something went wrong", error);
					showAlert(
						"danger",
						"An unexpected error occurred. Please try again later."
					);
				}
			});
	}

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				const response = await axios.get(
					`http://localhost:8080/showtimes/detail/${id}`
				);

				setShowtimeData(response.data.data);
			};
			fetchData();
		}
		AOS.init();
	}, [id]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [filteredHours, setFilteredHours] = useState([]);

	const handleDateChange = (event) => {
		const newDate = new Date(event.target.value);

		setSelectedDate(newDate);

		// Filter hours based on the selected date
		const filtered = filterHoursByDateAndTime(hours, newDate);
		setFilteredHours(filtered);
	};

	const fetchMovie = async () => {
		try {
			const response = await axios.get("http://localhost:8080/movies/showing");
			setMovies(response.data.data);
		} catch (error) {
			console.log("Error FetchMovie: ", error);
		}
	};

	const hoursToUse = useMemo(() => {
		// If no date is selected, use all hours
		if (!selectedDate) {
			return hours;
		}

		// Otherwise, use the filtered hours
		return filteredHours;
	}, [selectedDate, filteredHours, hours]);

	const fetchHour = async () => {
		try {
			const response = await axios.get("http://localhost:8080/hours");
			setHours(response.data.data);
		} catch (error) {
			console.log("Error fetchHour: ", error);
		}
	};

	const fetchAuditoria = async () => {
		try {
			const response = await axios.get("http://localhost:8080/auditorias");
			setAuditorias(response.data.data);
		} catch (error) {
			console.log("Error fetchAuditoria: ", error);
		}
	};

	useEffect(() => {
		fetchMovie();
		fetchAuditoria();
		fetchHour();
	}, []);

	return (
		<div className="container mt-3" data-aos="fade">
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
			<h2>Showtime Insert Form</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3 mt-3">
					<label htmlFor="id_movie">
						Movie<span className="text-danger">*</span>
					</label>
					<select
						className="form-select"
						id="id_movie"
						{...register("movie_id")}
					>
						<option>---- Movie ----</option>
						{movies.length > 0 &&
							movies.map((item, index) => {
								return (
									<option
										key={index}
										value={item.id}
										selected={
											showtimeData?.movie?.id ===
											item.id
										}
									>
										{item.title}
									</option>
								);
							})}
					</select>
					<span className="text-danger">{errors.movie_id?.message}</span>
				</div>

				<div className="mb-3">
					<label htmlFor="showtime_date" className="form-label">
						Showtime Date:<span className="text-danger">*</span>
					</label>
					<input
						type="date"
						className="form-control"
						id="showtime_date"
						placeholder="Enter Release Date"
						{...register("showtime_date")}
						// onChange={(e) => handleDateChange(e)}
						onChange={handleDateChange}
					/>
					<span className="text-danger">{errors.showtime_date?.message}</span>
				</div>

				<div className="mb-3">
					<label htmlFor="id_auditoria" className="form-label">
						Auditorium<span className="text-danger">*</span>
					</label>
					<select
						className="form-select"
						id="id_auditoria"
						{...register("auditoria_id")}
					>
						<option>---- Auditorium ----</option>
						{auditorias.length > 0 &&
							auditorias.map((item, index) => {
								return (
									<option
										key={index}
										value={item.id}
										selected={
											showtimeData?.auditoria?.id ===
											item.id
										}
									>
										{item.name}
									</option>
								);
							})}
					</select>
					<span className="text-danger">{errors.auditoria_id?.message}</span>
				</div>

				<div className="mb-3">
					<label htmlFor="id_suat" className="form-label">
						Hour<span className="text-danger">*</span>
					</label>
					<select className="form-select" id="id_suat" {...register("hour_id")}>
						<option>---- Select Hour ----</option>
						{hoursToUse.length > 0 &&
							hoursToUse.map((item, index) => (
								<option
									key={index}
									value={item.id}
									selected={showtimeData?.hour?.id === item.id}
								>
									{item.time_from}
								</option>
							))}
					</select>
					<span className="text-danger">{errors.hour_id?.message}</span>
				</div>

				<div className="mb-3">
					<span>
						Status<span className="text-danger">*</span>
					</span>
					<div className="form-check">
						<input
							type="radio"
							className="form-check-input"
							id="statusOn"
							{...register("status")}
							value={true}
							aria-checked={showtimeData?.status === true}
						/>
						<label className="form-check-label" htmlFor="statusOn">
							ON
						</label>
					</div>
					<div className="form-check">
						<input
							type="radio"
							className="form-check-input"
							id="statusOff"
							{...register("status")}
							value={false}
							aria-checked={showtimeData?.status === false}
						/>
						<label className="form-check-label" htmlFor="statusOff">
							OFF
						</label>
					</div>
					<span className="text-danger">{errors.status?.message}</span>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default ShowtimeForm;
