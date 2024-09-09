import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../../contexts/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";

//YUP
const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.email("wrong format email address")
			.required("Name cannot be blank!"),
	})
	.required();

function ForgotPasswordPage(props) {
	const { showAlert } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});
	const navigate = useNavigate();

	//onSubmit
	async function onSubmit(data) {
		const url = "http://localhost:8080/accounts/send_mail";

		const method = "POST";
		await axios({
			method,
			url,
			data,
		})
			.then((res) => {
				if (res.status === 200) {
					showAlert("success", "SEND OTP SUCCESSFULLY!");
					navigate("/checkotp");
				}
			})
			.catch((error) => console.log("Error API ", method, ": ", error));
	}

	useEffect(() => {
		AOS.init({
			duration: 1200,
		});
	}, []);

	return (
		<div className="container" data-aos="slide-right">
			<div className="row justify-content-center">
				<div className="card o-hidden border-0">
					<div className="card-body p-0">
						<div className="row">
							<div className="col-md-6 d-none d-lg-block">
								<img
									src="/assets/image/hinhanh/animon2.jpg"
									alt="img"
									width="75%"
								/>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="p-5">
									<div className="text-center">
										<h1 className="display-5 mb-2">
											Forgot Your Password?
										</h1>
										<p className="mb-4 text-dark">
											We get it, stuff happens. Just
											enter your email address below and
											we'll send you a link to reset
											your password!
										</p>
									</div>
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="user"
									>
										<div className="form-group">
											<input
												type="text"
												className="form-control form-control-user"
												id="email"
												placeholder="Enter Email Address"
												{...register("email")}
											/>
										</div>
										<button
											type="submit"
											className="btn btn-primary mt-4 w-100"
										>
											Get OTP
										</button>
									</form>
									<div className="text-center">
										<Link
											className="small"
											to="/create-account"
										>
											Create an Account!
										</Link>
									</div>
									<div className="text-center">
										<Link className="small" to="/sign-in">
											Already have an account? Sign in!
										</Link>
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

export default ForgotPasswordPage;
