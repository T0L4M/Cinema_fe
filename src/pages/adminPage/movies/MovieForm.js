import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DataContext } from "../../../contexts/DataContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const schema = yup
	.object()
	.shape({
		title: yup
			.string()
			.min(2, "Greater than 2 characters")
			.max(100, "Less than 100 characters")
			.required(),
		director: yup
			.string()
			.min(2, "Greater than 2 characters")
			.max(50, "Less than 50 characters")
			.required(),
		casts: yup
			.string()
			.min(2, "Greater than 2 characters")
			.max(100, "Less than 100 characters")
			.required(),
		genre: yup
			.string()
			.min(2, "Greater than 2 characters")
			.max(100, "Less than 100 characters")
			.required(),
		release_date: yup
			.date()
			.required()
			.typeError("Invalid Date Format")
			.min(
				new Date(new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000),
				"Release date cannot be more than 6 months in the past"
			)
			.max(
				new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
				"Release date cannot be more than 1 year in the future"
			),
		description: yup.string().nullable(),
		trailer: yup.string().nullable(),
		status: yup.string().oneOf(["Showing", "Not Showing", "Coming"]).required(),
		poster: yup.mixed().test("poster", "You need to provide a file", (value) => {
			if (value.length > 0) {
				return true;
			}
			return false;
		}),
	})
	.required();

function MovieForm(props) {
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
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				try {
					const response = await axios.get(
						`http://localhost:8080/movies/detail/${id}`
					);
					const movie = response.data.data;
					setValue("title", movie.title);
					setValue("director", movie.director);
					setValue("casts", movie.casts);
					setValue("genre", movie.genre);
					setValue("release_date", movie.release_date); // Assuming backend returns date in appropriate format
					setValue("description", movie.description);
					setValue("trailer", movie.trailer);
					setValue("status", movie.status);
					setExistingPoster(movie.poster);
				} catch (error) {
					console.error(error);
				}
			}
		};
		fetchData();
	}, [id]);

	function handleDateChange(e) {
		const selectedDate = new Date(e.target.value);
		const formattedDate = format(selectedDate, "yyyy-MM-dd");
		setFormattedReleaseDate(formattedDate);
	}

	function onSubmit(data) {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("director", data.director);
		formData.append("casts", data.casts);
		formData.append("genre", data.genre);
		formData.append("description", data.description);
		formData.append("status", data.status);
		formData.append("release_date", formattedReleaseDate);
		formData.append("image", data.poster[0] == null ? "" : data.poster[0]);

		if (existingPoster != null) {
			axios.put(`http://localhost:8080/movies/edit/${id}`, formData)
				.then((res) => {
					if (res.status == 200) {
						showAlert("success", "UPDATE MOVIE SUCCESSFULLY!");
						navigate(-1);
					}
				})
				.catch((err) => console.log(err));
		}
		axios.post("http://localhost:8080/movies", formData)
			.then((res) => {
				if (res.status == 200) {
					showAlert("success", "CREATE MOVIE SUCCESSFULLY!");
					navigate(-1);
				}
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="container mt-3">
			<h2>Movie Insert Form</h2>

			<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
				<div className="mb-3 mt-3">
					<label htmlFor="title">
						Title<span className="text-danger">*</span>
					</label>
					<input
						type="text"
						className="form-control"
						id="title"
						placeholder="Enter Title"
						{...register("title")}
					/>
					<span className="text-danger">{errors.title?.message}</span>
				</div>
				<div className="mb-3">
					<label htmlFor="genre">
						Genre<span className="text-danger">*</span>
					</label>
					<input
						type="text"
						className="form-control"
						id="genre"
						placeholder="Enter Genre"
						{...register("genre")}
					/>
					<span className="text-danger">{errors.genre?.message}</span>
				</div>

				<div className="row">
					<div className="mb-3 col-md-4">
						<label htmlFor="director">
							Director<span className="text-danger">*</span>
						</label>
						<input
							type="text"
							className="form-control"
							id="director"
							placeholder="Enter Director"
							{...register("director")}
						/>
						<span className="text-danger">{errors.director?.message}</span>
					</div>

					<div className="mb-3 col-md-4">
						<span>
							Status<span className="text-danger">*</span>
						</span>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input"
								id="dangchieu"
								{...register("status")}
								value="showing"
							/>
							<label className="form-check-label" htmlFor="dangchieu">
								Now Showing
							</label>
						</div>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input"
								id="sapchieu"
								{...register("status")}
								value="coming"
							/>
							<label className="form-check-label" htmlFor="sapchieu">
								Coming Soon
							</label>
						</div>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input"
								id="hetchieu"
								{...register("status")}
								value="not showing"
							/>
							<label className="form-check-label" htmlFor="hetchieu">
								Not Showing
							</label>
						</div>
						<span className="text-danger">{errors.status?.message}</span>
					</div>

					<div className="mb-3 col-md-4">
						<label htmlFor="release_date">
							Release Date<span className="text-danger">*</span>
						</label>
						<input
							type="date"
							className="form-control"
							id="release_date"
							placeholder="Enter Release Date"
							{...register("release_date")}
							onChange={(e) => handleDateChange(e)}
						/>
						<span className="text-danger">
							{errors.release_date?.message}
						</span>
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="casts">
						Casts<span className="text-danger">*</span>
					</label>
					<input
						type="text"
						className="form-control"
						id="casts"
						placeholder="Enter Casts"
						name="casts"
						{...register("casts")}
					/>
					<span className="text-danger">{errors.casts?.message}</span>
				</div>

				<div className="mb-3">
					<label htmlFor="trailer">Trailer</label>
					<input
						type="text"
						className="form-control"
						id="trailer"
						placeholder="Enter Trailer URL"
						{...register("trailer")}
					/>
					<span className="text-danger">{errors.trailer?.message}</span>
				</div>

				{existingPoster != null && (
					<div className="mb-3">
						<label htmlFor="oldPoster">Present Poster</label>
						<img
							src={`http://localhost:8080/uploads/movies/${existingPoster}`}
							alt="oldPoster"
							className="img-thumbnail"
							width="100"
						/>
					</div>
				)}
				<div className="mb-3">
					<label htmlFor="poster">
						Poster<span className="text-danger">*</span>
					</label>
					<input
						type="file"
						className="form-control"
						id="poster"
						{...register("poster")}
					/>
					<span className="text-danger">{errors.poster?.message}</span>
				</div>
				<div className="mb-3">
					<label htmlFor="description">
						Description<span className="text-danger">*</span>
					</label>
					<textarea
						className="form-control"
						rows="5"
						id="description"
						{...register("description")}
					></textarea>
					<span className="text-danger">{errors.description?.message}</span>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default MovieForm;
