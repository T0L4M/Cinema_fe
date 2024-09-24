import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import { format, startOfDay } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

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
		formState: { errors, isValid },
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

	useEffect(() => {
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
			padding: "80px 0", // Thêm khoảng cách ở trên để xích form xuống
		},
		card: {
			backgroundColor: "transparent",
			borderRadius: "10px",
			padding: "1.5rem",
			maxWidth: "480px", // Chiều rộng lớn hơn cho form
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
			width: "48%", // Chiếm một nửa chiều rộng cho email và dob
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
			<div style={styles.contentWrapper}>
				<div style={styles.card}>
					<div style={styles.formSection}>
						<h1 style={styles.h1}>SIGN UP</h1>
						<p style={styles.p}>
							Enjoy exclusive benefits and rewards with MovieClub
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								type="hidden"
								value="USER"
								{...register("role")}
							></input>
							<div style={styles.inputGroup}>
								<input
									type="text"
									style={styles.inputHalf}
									placeholder="Username"
									{...register("userName")}
								/>
								<span className="text-danger">
									{errors.userName?.message}
								</span>
								<input
									type="text"
									style={styles.inputHalf}
									placeholder="Phone"
									{...register("phone")}
								/>
								<span className="text-danger">
									{errors.phone?.message}
								</span>
							</div>

							{/* Email and DOB */}
							<div style={styles.inputGroup}>
								<input
									type="email"
									style={styles.inputHalf}
									placeholder="Email"
									{...register("email")}
								/>
								<span className="text-danger">
									{errors.email?.message}
								</span>
								<input
									type="date"
									style={styles.inputHalf}
									{...register("dob")}
								/>
								<span className="text-danger">
									{errors.dob?.message}
								</span>
							</div>

							{/* Address */}
							<div className="form-group">
								<input
									type="text"
									style={styles.input}
									placeholder="Address"
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
									placeholder="Password"
									{...register("password")}
								/>
								<span className="text-danger">
									{errors.password?.message}
								</span>
							</div>

							{/* Gender */}
							<div style={styles.genderContainer}>
								<label style={styles.genderLabel}>Gender:</label>
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
