import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DataContext } from "../../../contexts/DataContext";
import "aos/dist/aos.css";

const schema = yup
	.object()
	.shape({
		userName: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

function UserLoginPage(props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { auth, login, showAlert, alert } = useContext(DataContext);
	const navigate = useNavigate();
	async function onSubmit(data) {
		showAlert("hide");
		await axios
			.post("http://localhost:8080/accounts/login", data)
			.then((res) => {
				if (res.status == 200) {
					// console.log("DATA: ", jwtDecode(res.data.message));

					login(res.data.message);
				}
			})
			.catch((error) => {
				if (error.response.status == 400) {
					showAlert("danger", "Wrong Username OR Password");
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
		AOS.init({
			duration: 1200,
		});
		if (Object.keys(auth).length > 0) {
			showAlert("warning", "Login Alredy!");
			navigate("/");
		}
	}, []);
	return (
		<div className="container" data-aos="slide-right">
			{alert.type != "" && (
				<Alert variant={alert.type} dismissible transition>
					{alert.message}
				</Alert>
			)}
			<div className="row justify-content-center">
				<div className="col-xl-10 col-lg-12 col-md-9">
					<div className="card o-hidden border-0 shadow-lg my-5">
						<div className="card-body p-0">
							<div className="row">
								<div className="col-lg-6 d-none d-lg-block">
									<img
										src="/assets/image/hinhanh/minions-funny-3.jpg"
										alt="img"
									/>
								</div>
								<div className="col-lg-6">
									<div className="p-5">
										<div className="text-center">
											<h1 className="mb-4">SIGN IN</h1>
										</div>

										<form
											className="user"
											onSubmit={handleSubmit(onSubmit)}
										>
											<div className="form-group">
												<input
													type="text"
													className="form-control form-control-user"
													id="exampleInputEmail"
													placeholder="Enter Username"
													{...register(
														"userName"
													)}
												/>
												<span className="text-danger">
													{
														errors.userName
															?.message
													}
												</span>
											</div>
											<div className="form-group">
												<input
													type="password"
													className="form-control form-control-user"
													id="exampleInputPassword"
													placeholder="Enter Password"
													{...register(
														"password"
													)}
												/>
												<span className="text-danger">
													{
														errors.password
															?.message
													}
												</span>
											</div>

											<input
												type="submit"
												value="Sign in"
												className="btn btn-primary btn-user btn-block"
											/>
										</form>
										<hr />
										<div className="text-center">
											<Link
												className="small"
												to={"/forgotpassword"}
											>
												Forgot Password?
											</Link>
										</div>
										<div className="text-center">
											<Link
												className="small"
												to={"/register"}
											>
												Create an Account!
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserLoginPage;
