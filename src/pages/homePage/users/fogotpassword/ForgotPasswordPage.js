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
		document.title = "TGV CINEMA || Forgot Password Page";
		AOS.init({
			duration: 1200,
		});
	}, []);

	const styles = {
		container: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "100vh",
			background: "linear-gradient(to bottom, #111111, #480607, #202020)",
		},
		card: {
			backgroundColor: "transparent",
			border: "none",
			// boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
		},
		formControl: {
			backgroundColor: "transparent",
			border: "none",
			borderBottom: "2px solid #f8f8ff",
			color: "white",
			padding: "15px",
			marginBottom: "20px",
			borderRadius: 0,
			width: "100%",
			fontSize: "18px",
		},
		formControlFocus: {
			outline: "none",
			borderBottom: "2px solid #ff512f",
		},
		placeholder: {
			color: "#999999",
			fontSize: "16px",
		},
		button: {
			background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
			color: "white",
			border: "none",
			padding: "12px 0",
			fontSize: "16px",
			textTransform: "uppercase",
			cursor: "pointer",
			fontWeight: "bold",
			transition: "background 0.3s ease",
		},
		buttonHover: {
			background: "linear-gradient(90deg, #ff6f47 0%, #f23a85 100%)",
		},
		link: {
			color: "white",
			textDecoration: "none",
			fontWeight: "bold",
			transition: "color 0.3s ease",
		},
		linkHover: {
			color: "#ff0000",
		},
		linkActive: {
			color: "#dd2476",
		},
	};

	return (
		<div style={styles.container} data-aos="slide-down">
			<div style={styles.card} className="card o-hidden border-0">
				<div className="card-body p-0">
					<div className="row justify-content-center align-items-center h-100">
						<div className="col-md-6 col-sm-12">
							<div className="p-5">
								<div className="text-center">
									<h1 className="display-5 mb-2 text-light">
										Forgot Your Password?
									</h1>
									<p className="mb-4 text-light">
										We get it, stuff happens. Just enter
										your email address below and we'll send
										you a link to reset your password!
									</p>
								</div>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="user"
								>
									<div className="form-group">
										<input
											type="text"
											style={styles.formControl}
											id="email"
											placeholder="Enter Email Address"
											{...register("email")}
										/>
										<span className="text-danger">
											{errors.email?.message}
										</span>
									</div>
									<button
										type="submit"
										style={styles.button}
										className="btn btn-primary mt-4 w-100 custom-button"
									>
										Get OTP
									</button>
								</form>
								<div className="text-center mt-4">
									<Link
										to="/register"
										style={styles.link}
										onMouseOver={(e) =>
											(e.target.style.color = "#ff0000")
										}
										onMouseOut={(e) =>
											(e.target.style.color = "white")
										}
									>
										Create an Account!
									</Link>
								</div>
								<div className="text-center mt-2">
									<Link
										to="/sign-in"
										style={styles.link}
										onMouseOver={(e) =>
											(e.target.style.color = "#ff0000")
										}
										onMouseOut={(e) =>
											(e.target.style.color = "white")
										}
									>
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

export default ForgotPasswordPage;
