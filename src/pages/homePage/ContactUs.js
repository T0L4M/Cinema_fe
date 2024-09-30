import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ContactUs(props) {
	useEffect(() => {
		document.title = "TGV CINEMA || Contact Us";
		AOS.init({
			duration: 1200,
		});
	}, []);

	// Định nghĩa các style
	const styles = {
		container: {
			paddingTop: "80px", // Tăng padding trên để đẩy nội dung xuống sát hơn
			paddingBottom: "80px", // Thêm padding dưới để tạo khoảng trống cho trang dài ra
			minHeight: "150vh", // Đảm bảo trang đủ dài để có thể cuộn
			background: "linear-gradient(to bottom, #111111, #480607,#202020)", // Thay đổi màu nền
			color: "#fff", // Màu chữ trắng
		},
		feedbackSection: {
			color: "red",
		},
		formInput: {
			backgroundColor: "transparent",
			color: "#fff",
			border: "1px solid #fff", // Đường viền trắng
			padding: "10px",
			borderRadius: "5px",
			marginBottom: "15px",
		},
		formTextArea: {
			backgroundColor: "transparent",
			color: "#fff",
			border: "1px solid #fff",
			padding: "10px",
			borderRadius: "5px",
			resize: "none",
			width: "100%",
		},
		buttonSubmit: {
			backgroundColor: "#ff0000", // Màu đỏ cho nút
			border: "none",
			color: "#fff",
			padding: "10px 20px",
			borderRadius: "5px",
			cursor: "pointer",
			textTransform: "uppercase",
			fontWeight: "bold",
		},
		mapContainer: {
			marginTop: "30px",
		},
		mapIframe: {
			border: 0,
			borderRadius: "10px",
			width: "100%",
			height: "450px",
		},
	};

	return (
		<div style={styles.container}>
			<div className="container-xl">
				<div
					className="row contact_1 bg_dark pt-5 pb-5 rounded-4"
					data-aos="fade-down"
				>
					<div className="col-md-3">
						<div className="contact_1i row">
							<div className="col-md-2 col-2">
								<div className="contact_1il">
									<span className="col_red fs-3">
										<i className="fa-solid fa-location-dot"></i>
									</span>
								</div>
							</div>
							<div className="col-md-10 col-10">
								<div className="contact_1ir">
									<h5 className="col_red">Address</h5>
									<p className="mb-0">
										391A Nam Kỳ Khởi Nghĩa, Ward 7, District
										3, HCMC
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="contact_1i row">
							<div className="col-md-2 col-2">
								<div className="contact_1il">
									<span className="col_red fs-3">
										<i className="fa-solid fa-clock"></i>
									</span>
								</div>
							</div>
							<div className="col-md-10 col-10">
								<div className="contact_1ir">
									<h5 className="col_red">Working hours</h5>
									<p className="mb-0">8:00 - 22:00</p>
									<p className="mb-0">(Including Holidays)</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="contact_1i row">
							<div className="col-md-2 col-2">
								<div className="contact_1il">
									<span className="col_red fs-3">
										<i className="fa-solid fa-envelope"></i>
									</span>
								</div>
							</div>
							<div className="col-md-10 col-10">
								<div className="contact_1ir">
									<h5 className="col_red">E-mail</h5>
									<p className="mb-0">fin_cinema@gmail.com</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="contact_1i row">
							<div className="col-md-2 col-2">
								<div className="contact_1il">
									<span className="col_red fs-3">
										<i className="fa-solid fa-phone"></i>
									</span>
								</div>
							</div>
							<div className="col-md-10 col-10">
								<div className="contact_1ir">
									<h5 className="col_red">Phone Numbers</h5>
									<p className="mb-0">+123 123 456</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row contact_3 mt-4" style={styles.mapContainer}>
					<div className="col-md-12">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.267979060374!2d106.67926757480507!3d10.790775789358879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4a8afdb7b%3A0x2e46c4ada94947dd!2zMzkxQSDEkC4gTmFtIEvhu7MgS2jhu59pIE5naMSpYSwgUGjGsOG7nW5nIDE0LCBRdeG6rW4gMywgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1724763500959!5m2!1svi!2s"
							style={styles.mapIframe}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Google Maps Location"
						></iframe>
					</div>
				</div>
				<p>DE QUANG CAO CUA MY</p>
			</div>
		</div>
	);
}

export default ContactUs;
