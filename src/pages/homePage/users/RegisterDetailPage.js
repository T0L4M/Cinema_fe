import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import { startOfDay } from "date-fns";

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
	})
	.required();

function RegisterDetailPage(props) {
	const [registerData, setRegisterData] = useState({});
	const { showAlert, auth } = useContext(DataContext);
	const { username } = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: registerData,
	});
	const navigate = useNavigate();

	//onSubmit
	async function onSubmit(data) {
		const url = `http://localhost:8080/accounts/edit/${auth.id}`;

		const method = "PUT";
		await axios({
			method,
			url,
			data,
		})
			.then((res) => {
				if (res.status === 200) {
					showAlert("success", "UPDATE MY ACCOUNT SUCCESSFULLY!");
					navigate("/registerdetail");
				}
			})
			.catch((error) => console.log("Error API ", method, ": ", error));
	}
	useEffect(() => {
		if (auth.id) {
			const fetchData = async () => {
				const response = await axios.get(
					`http://localhost:8080/accounts/detail/${auth.id}`
				);
				setRegisterData(response.data.data);
			};
			fetchData();
		}
	}, [auth.id]);

	return (
		<div className="container">
			<div className="row">
				<h1>My account</h1>
				{registerData != null && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="container">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="userName">
											UserName
										</label>
										<input
											id="userName"
											type="text"
											className="form-control"
											value={registerData.userName}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div class="form-group">
										<label htmlFor="email">Email</label>
										<input
											id="email"
											type="email"
											class="form-control"
											readonly
											value={registerData.email}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-lg-3">
									<div className="form-group">
										<label htmlFor="dob">Birthday</label>
										<input
											id="dob"
											type="date"
											className="form-control"
											value={registerData.dob}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="gender">Gender:</label>
										<label className="gender">
											<input
												type="radio"
												value={registerData.gender}
												checked={
													registerData.gender ==
													true
												}
											/>
											<span className="gender-name">
												Male
											</span>
										</label>
										<label className="gender">
											<input
												type="radio"
												value={registerData.gender}
												checked={
													registerData.gender ==
													false
												}
											/>
											<span className="gender-name">
												Female
											</span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="address">Address</label>
										<input
											id="address"
											type="text"
											className="form-control"
											value={registerData.address}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="phone">Phone</label>
										<input
											id="phone"
											type="text"
											className="form-control"
											value={registerData.phone}
										/>
									</div>
								</div>
							</div>
						</div>

						<button type="submit" className="btn btn-primary mt-3 me-3">
							<i className="fa fa-save"></i>
							Save
						</button>
						<Link to="/newpassword" className="btn btn-primary mt-3">
							<i className="fa fa-lock"></i> New Password
						</Link>
					</form>
				)}
			</div>
		</div>
	);
}

export default RegisterDetailPage;
