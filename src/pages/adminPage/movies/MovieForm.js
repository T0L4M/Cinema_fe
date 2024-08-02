import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DataContext } from "../../../contexts/DataContext";

const schema = yup
	.object()
	.shape({
		name: yup
			.string()
			.min(2, "Greater than 2 characters")
			.max(50, "Less than 50 characters")
			.required(),
		Id_Category: yup.number().required(),
		capacity: yup
			.string()
			.matches(/(minute|hour)$/i, 'Must end with "/minute" or "/hour"')
			.required(),
		weight: yup
			.number()
			.required()
			.min(50, "Greater than 50")
			.max(100000, "Less than 100 000"),
		status: yup.string().required(),
		machine_dimension: yup
			.string()
			.matches(
				/^(\d{2,3}(?:\.\d+)?)cm x (\d{2,3}(?:\.\d+)?)cm x (\d{2,3}(?:\.\d+)?)cm$/,
				"Format must be: XXcm x XXcm x XXcm (XX: 2-3 digits)"
			)
			.nullable(),
		size_bottle: yup.number().min(0, "Greater than 0").nullable(),
		size_capsule: yup.number().min(0, "Greater than 0").nullable(),
		size_tablet: yup.number().min(0, "Greater than 0").nullable(),
		thumbnail: yup.mixed().test("thumbnail", "You need to provide a file", (value) => {
			if (value.length > 0) {
				return true;
			}
			return false;
		}),
	})
	.required();

function MovieForm(props) {
	const { showAlert } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	function onSubmit(data) {
		const formData = new FormData();
		formData.append("Name", data.name);
		formData.append("Status", data.status);
		formData.append("Id_Category", data.Id_Category);
		formData.append("Capacity", data.capacity);
		formData.append("Weight", data.weight);
		formData.append("Machine_Dimension", data.machine_dimension);
		formData.append("Description", editorData);
		formData.append("Size_Capsule", data.size_capsule);
		formData.append("Size_Tablet", data.size_tablet);
		formData.append("Size_Bottle", data.size_bottle);
		formData.append("file", data.thumbnail[0]);
		formData.append("Id_User", auth?.id);
		axios.post("http://localhost:5087/api/Product", formData)
			.then((res) => {
				if (res.status == 201) {
					showAlert("success", "CREATE PRODUCT SUCCESSFULLY!");
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

					{/* PAY ATTENTION */}
					{/* <div className="mb-3 col-md-4">
              <span>Status<span className='text-danger'>*</span></span>
             <div className="form-check">
                          <input type="radio" className="form-check-input" id="dangchieu" name="movie_status" value="showing" {{ old('movie_status') == "showing"?'checked':'' }}>
                          <label className="form-check-label" for="dangchieu">Now Showing</label>
                        </div>
                  
                  
          <div className="form-check">
                
                                <input type="radio" className="form-check-input" id="sapchieu" name="movie_status" value="coming" {{ old('movie_status') == "coming"?'checked':'' }}>
                                <label className="form-check-label" for="sapchieu">Coming Soon</label>
                
          </div>
          @error('movie_status')
          <span className="text-danger">{{ $message }}</span>
      @enderror
             
            </div> */}

					<div className="mb-3 col-md-4">
						<label htmlFor="release_date">Release Date</label>
						<input
							type="date"
							className="form-control"
							id="release_date"
							placeholder="Enter Release Date"
							{...register("release_date")}
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
