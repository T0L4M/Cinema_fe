import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import { format, startOfDay, subYears } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";
import { Alert } from "react-bootstrap";

const phoneF = /^\+?[0-9]\d{1,10}$/;

// Yup schema
const schema = yup
	.object({
		gender: yup.boolean(),
		dob: yup
			.date()
			.typeError("Invalid Date Format")
			.required("Register Date cannot be blank!")
			.test("minAge", "You must be at least 14 years old to register", (value) => {
				if (!value) return true; // No value, no error
				const currentDate = new Date();
				const birthDate = new Date(value);
				return currentDate.getFullYear() - birthDate.getFullYear() >= 14;
			}),
		userName: yup.string().required("UserName is required"),
		phone: yup
			.string()
			.required("Phone cannot be blank!")
			.matches(phoneF, "Phone number is not valid"),
		email: yup.string().email("Invalid email").required("Please fill in email field!"),
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
	const { showAlert, alert, hideAlert } = useContext(DataContext);
	const [formattedShowtimeDate, setFormattedShowtimeDate] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});
	const navigate = useNavigate();

	// Submit handler
	async function onSubmit(data) {
		// data.dob = formattedShowtimeDate;
		await axios
			.post("http://localhost:8080/accounts/register", data)
			.then((res) => {
				if (res.status == 200) {
					showAlert("success", "REGISTER SUCCESSFULLY!");
					navigate(-1);
				}
			})
			.catch((error) => {
				if (error.response.status == 400) {
					showAlert("warning", "Duplicated Username OR Email");
				} else {
					console.log("Something went wrong", error);
					showAlert(
						"danger",
						"An unexpected error occurred. Please try again later."
					);
				}
			});
	}

	// function handleDateChange(e) {
	// 	const selectedDate = new Date(e.target.value);
	// 	const formattedDate = format(selectedDate, "yyyy-MM-dd");
	// 	setFormattedShowtimeDate(formattedDate);
	// }

	useEffect(() => {
		document.title = "TGV CINEMA || Sign Up Page";
		AOS.init({
			duration: 1200,
		});
	}, []);
	// Inline styles for the layout
	const styles = {
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between", // Đẩy footer xuống cuối
			minHeight: "100vh", // Chiều cao toàn trang
			background: "linear-gradient(to bottom, #111111, #480607)", // Nền gradient
		},
		contentWrapper: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexGrow: 1,
		},
		card: {
			backgroundColor: "transparent",
			borderRadius: "10px",
			padding: "1.5rem",
			maxWidth: "40em", // Chiều rộng lớn hơn cho form
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			marginTop: "20px", // Xích form xuống thêm một chút
		},
		formSection: {
			padding: "1rem",
			color: "white",
		},
		h1: {
			fontSize: "24px",
			color: "#fff",
			marginBottom: "1rem",
			textAlign: "center",
		},
		input: {
			backgroundColor: "transparent", // Không có khung
			border: "none",
			borderBottom: "2px solid white",
			color: "white",
			padding: "8px",
			width: "100%",
			marginBottom: "1rem",
		},
		inputFocused: {
			borderBottom: "2px solid red", // Dòng gạch màu đỏ khi được chọn
		},
		inputHalf: {
			// width: "48%", // Chiếm một nửa chiều rộng cho email và dob
			backgroundColor: "transparent",
			border: "none",
			borderBottom: "2px solid white",
			color: "white",
			padding: "8px",
			marginBottom: "1rem",
		},
		inputHalfdate: {
			width: "85%", // Chiếm một nửa chiều rộng cho email và dob
			backgroundColor: "transparent",
			border: "none",
			borderBottom: "2px solid white",
			color: "white",
			padding: "8px",
			marginBottom: "1rem",
		},
		inputGroup: {
			display: "flex",
			justifyContent: "space-between",
		},
		genderContainer: {
			display: "flex",
			alignItems: "center", // Căn giữa nội dung theo chiều dọc
			justifyContent: "space-between",
			marginTop: "1rem",
			marginBottom: "1rem",
		},
		genderLabel: {
			color: "white",
			fontSize: "16px",
			marginRight: "10px",
		},
		btnPrimary: {
			background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
			border: "none",
			padding: "8px 0",
			fontSize: "14px",
			color: "white",
			textTransform: "uppercase",
			fontWeight: "bold",
			marginTop: "10px",
			width: "100%",
			cursor: isValid ? "pointer" : "not-allowed", // Chỉ hiển thị con trỏ chuột hình bàn tay nếu form hợp lệ
			opacity: isValid ? 1 : 0.5, // Làm mờ nút nếu form không hợp lệ
		},
		smallText: {
			fontSize: "12px", // Làm chữ nhỏ cho "Have an account"
			color: "white",
			marginTop: "15px", // Tạo khoảng cách trên Sign In
		},
		footerImageContainer: {
			// zIndex: "0",
			width: "100%",
			height: "auto",
			overflow: "hidden",
			marginTop: "-200px", // Đẩy hình ảnh lên trên một chút
		},
		footerImage: {
			width: "100%",
			height: "auto",
			objectFit: "cover",
		},
		footer: {
			textAlign: "center",
			color: "white",
			padding: "10px 0",
			background: "#111",
			marginTop: "20px",
		},
		redBorder: {
			borderBottom: "2px solid red", // Đổi sang màu đỏ khi input được chọn
		},
		calendarIcon: {
			color: "red", // Icon lịch màu đỏ
		},
		link: {
			color: "red",
			textDecoration: "underline",
			cursor: "pointer", // Hiển thị hình bàn tay khi di chuột qua "SIGN IN"
		},
	};
	return (
		<div style={styles.container}>
			{alert.type !== "" && (
				<Alert
					variant={alert.type}
					dismissible
					transition
					onClose={hideAlert}
					className="position-fixed bottom-0 end-0"
					style={{ width: "fit-content", zIndex: 9999 }}
				>
					{alert.message}
				</Alert>
			)}
			<div style={styles.contentWrapper}>
				<div style={styles.card}>
					<div style={styles.formSection} data-aos="fade-down">
						<h1 style={styles.h1}>SIGN UP</h1>
						<p style={styles.p} className="text-center">
							Enjoy exclusive benefits and rewards with TGV Cinema
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								type="hidden"
								value="USER"
								{...register("role")}
							></input>
							<div style={styles.inputGroup}>
								<div style={{ width: "49%" }}>
									<input
										type="text"
										style={styles.inputHalf}
										placeholder="Username*"
										{...register("userName")}
									/>
									<span className="text-danger">
										{errors.userName?.message}
									</span>
								</div>
								<div style={{ width: "49%" }}>
									<input
										type="text"
										style={styles.inputHalf}
										placeholder="Phone*"
										{...register("phone")}
									/>
									<span className="text-danger">
										{errors.phone?.message}
									</span>
								</div>
							</div>

							{/* Email and DOB */}
							<div style={styles.inputGroup}>
								<div style={{ width: "49%" }}>
									<input
										type="email"
										style={styles.inputHalf}
										placeholder="Email*"
										{...register("email")}
									/>
									<span className="text-danger">
										{errors.email?.message}
									</span>
								</div>
								<div style={{ width: "49%" }}>
									<input
										type="date"
										style={styles.inputHalfdate}
										{...register("dob")}
									/>
									<span className="text-danger">
										{errors.dob?.message}
									</span>
								</div>
							</div>

							{/* Address */}
							<div className="form-group mb-0">
								<input
									type="text"
									style={styles.input}
									placeholder="Address*"
									{...register("address")}
								/>
								<span className="text-danger">
									{errors.address?.message}
								</span>
							</div>

							{/* Password */}
							<div className="form-group">
								<input
									type="password"
									style={styles.input}
									placeholder="Password*"
									{...register("password")}
								/>
								<span className="text-danger">
									{errors.password?.message}
								</span>
							</div>

							{/* Gender */}
							<div style={styles.genderContainer}>
								<label style={styles.genderLabel}>Gender*</label>
								<label style={styles.genderLabel}>
									<input
										type="radio"
										value={true}
										{...register("gender")}
									/>
									Male
								</label>
								<label style={styles.genderLabel}>
									<input
										type="radio"
										value={false}
										{...register("gender")}
									/>
									Female
								</label>
								<span className="text-danger">
									{errors.gender?.message}
								</span>
							</div>
							<button
								style={styles.btnPrimary}
								disabled={!isValid}
								type="submit"
							>
								Sign Up
							</button>
						</form>
						<p style={styles.smallText}>
							HAVE AN ACCOUNT?{" "}
							<Link style={styles.link} to="/login">
								SIGN IN
							</Link>
						</p>
					</div>
				</div>
			</div>
			<div style={styles.footerImageContainer}>
				<img
					src="/assets/image/register.png"
					alt="Footer"
					style={styles.footerImage}
				/>
			</div>
		</div>
	);
}

export default RegisterPage;
