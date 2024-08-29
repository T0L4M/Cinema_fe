import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import { format, startOfDay } from "date-fns";

const phoneF = /^\+?[0-9]\d{1,10}$/;

// Yup schema
const schema = yup
	.object({
		gender: yup.boolean(),
		dob: yup
			.date()
			.typeError("Invalid Date Format")
			.max(startOfDay(new Date()), "Register date cannot be earlier than today")
			.required("Register Date cannot be blank!"),
		userName: yup.string().required("UserName is required"),
		phone: yup
			.string()
			.required("Phone cannot be blank!")
			.matches(phoneF, "Phone number is not valid"),
		email: yup.string().email().required("Email cannot be blank!"),
		address: yup.string().required("Address cannot be blank!"),
		role: yup.string().oneOf(["USER", "ADMIN"]).required(),
		password: yup
			.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		// passwordCheck: yup
		//   .string()
		//   .oneOf([yup.ref('password'), null], 'Passwords must match')
		//   .required('Confirm Password is required'),
	})
	.required();

function RegisterPage(props) {
	const { showAlert } = useContext(DataContext);
	const [formattedShowtimeDate, setFormattedShowtimeDate] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});
	const navigate = useNavigate();

	// Submit handler
	async function onSubmit(data) {
		data.dob = formattedShowtimeDate;

		try {
			const res = await axios.post("http://localhost:8080/accounts/register", data);
			if (res.status === 200) {
				showAlert("success", "REGISTER SUCCESSFULLY!");
				navigate(-1);
			}
		} catch (error) {
			console.error("Error API ", error);
		}
	}

	function handleDateChange(e) {
		const selectedDate = new Date(e.target.value);
		const formattedDate = format(selectedDate, "yyyy-MM-dd");
		setFormattedShowtimeDate(formattedDate);
	}

	return (
		<div className="container">
			<div className="card o-hidden border-0">
				<div className="card-body p-0">
					<div className="row">
						<div className="col-md-5 d-none d-md-block">
							<img src="" alt="img" />
						</div>
						<div className="col-md-7 col-12">
							<div className="p-5">
								<div className="text-center">
									<h1 className="mb-4">CREATE AN ACCOUNT</h1>
								</div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<input
										type="hidden"
										value="USER"
										{...register("role")}
									></input>
									<div className="form-group">
										<label htmlFor="gender">Gender: </label>
										<label className="gender">
											<input
												type="radio"
												value={true}
												{...register("gender")}
											/>
											<span className="gender-name">
												Male
											</span>
											<span className="gender-shape"></span>
										</label>
										<label className="gender">
											<input
												type="radio"
												value={false}
												{...register("gender")}
											/>
											<span className="gender-name">
												Female
											</span>
											<span className="gender-shape"></span>
										</label>
										<span className="text-danger">
											{errors.gender?.message}
										</span>
									</div>
									<div className="form-group row">
										<div className="col-sm-6 mb-3 mb-sm-0">
											<input
												type="text"
												className="form-control form-control-user"
												placeholder="Login Username"
												{...register("userName")}
											/>
											<span className="text-danger">
												{errors.userName?.message}
											</span>
										</div>
										<div className="col-sm-6">
											<input
												type="text"
												className="form-control form-control-user"
												placeholder="Phone"
												{...register("phone")}
											/>
											<span className="text-danger">
												{errors.phone?.message}
											</span>
										</div>
									</div>
									<div className="form-group">
										<input
											type="email"
											className="form-control form-control-user"
											placeholder="Email"
											{...register("email")}
										/>
										<span className="text-danger">
											{errors.email?.message}
										</span>
									</div>
									<div className="form-group row">
										<div className="col-sm-6 mb-3 mb-sm-0">
											<input
												type="date"
												className="form-control form-control-user"
												{...register("dob")}
												onChange={(e) =>
													handleDateChange(e)
												}
											/>
											<span className="text-danger">
												{errors.dob?.message}
											</span>
										</div>
									</div>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-user"
											placeholder="Address"
											{...register("address")}
										/>
										<span className="text-danger">
											{errors.address?.message}
										</span>
									</div>
									<div className="form-group row">
										<div className="col-sm-6 mb-3 mb-sm-0">
											<input
												type="password"
												className="form-control form-control-user"
												placeholder="Password"
												{...register("password")}
											/>
											<span className="text-danger">
												{errors.password?.message}
											</span>
										</div>
									</div>
									<button className="btn btn-primary btn-user btn-block">
										Sign up
									</button>
								</form>
								<div
									className="text-center
"
								>
									<Link
										className="small"
										to={"/forgotpassword"}
									>
										Forgot Password?
									</Link>
								</div>
								<div className="text-center">
									<Link className="small" to={"/login"}>
										Already have an account? Sign in!
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
