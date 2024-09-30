import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function AboutUs(props) {
	useEffect(() => {
		document.title = "TGV CINEMA || About Us";
		AOS.init({
			duration: 1200,
		});
	}, []);

	// CSS viết trực tiếp trong const styles
	const styles = {
		bannerContainer: {
			position: "relative",
			textAlign: "center",
			// marginBottom: "30px",
		},
		bannerImage: {
			width: "100%",
			height: "800px",
			objectFit: "cover",
			opacity: 0.5,
			filter: "brightness(60%)",
		},
		overlayText: {
			position: "absolute",
			top: "55%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: "80%",
			color: "#a40000",
			textAlign: "center",
		},
		welcomeText: {
			fontSize: "80px",
			fontWeight: "bold",
			marginBottom: "20px",
		},
		descriptionText: {
			fontSize: "20px",
			lineHeight: "1.8",
			color: "#f8f8ff",
			maxWidth: "900px",
			margin: "0 auto",
		},
		aboutSection: {
			paddingTop: "50px",
			paddingBottom: "50px",
			background: "linear-gradient(to bottom, #111111, #480607,#202020)",
			color: "white",
		},
		meetTeamSection: {
			textAlign: "left",
			marginTop: "30px",
			marginBottom: "50px",
			paddingLeft: "40px", // Dịch chuyển phần Meet The Team ra ngoài một chút
		},
		meetText: {
			color: "red",
			fontSize: "36px",
			fontWeight: "bold",
		},
		teamText: {
			fontSize: "36px",
			fontWeight: "bold",
			color: "white",
		},
		memberContainer: {
			display: "flex",
			justifyContent: "space-around",
			marginTop: "30px",
			gap: "60px", // Khoảng cách giữa các khung thành viên
		},
		memberCard: {
			textAlign: "center",
			padding: "20px",
			width: "600px", // Định dạng khung hình lớn hơn
			height: "500px", // Chiều cao tăng lên để chứa thông tin và ảnh lớn hơn
			backgroundColor: "#222",
			borderRadius: "10px",
			boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
			alignItems: "center", // To center content horizontally
			gap: "40px", // Gap between elements
		},
		memberImage: {
			borderRadius: "10px",
			width: "100%", // Hình ảnh vừa với khung
			height: "300px", // Chiều cao cố định lớn hơn
			objectFit: "cover",
			marginBottom: "10px",
		},
		memberName: {
			fontWeight: "bold",
			color: "#fff",
		},
		memberRole: {
			color: "#aaa",
			marginBottom: "10px",
		},
		contactLinks: {
			listStyleType: "none",
			paddingLeft: "0",
			display: "flex",
			justifyContent: "center",
		},
		contactLinkItem: {
			margin: "0 10px",
			color: "#fff",
		},
	};

	return (
		<>
			<div style={styles.bannerContainer}>
				<img
					src="/assets/image/rap_ghe.jpg"
					alt="Cinema Poster"
					style={styles.bannerImage}
				/>
				<div style={styles.overlayText} data-aos="fade-up">
					<h1 style={styles.welcomeText}>WELCOME TO TGV</h1>
					<p style={styles.descriptionText}>
						At TGV Cinemas, it is not just about movies but a total
						entertainment experience! We have welcomed millions of guests
						through our doors offering the widest range of cinematic
						experiences in Vietnam.
					</p>
					<p style={styles.descriptionText}>
						Providing you with the most actionable Film Production Services.
						Planis creates and distributes Video Content.
					</p>
					<p style={styles.descriptionText}>
						Your one-stop shop for all things cinema. We offer a wide range
						of films to choose from, including the latest blockbusters,
						independent films, and classic favourites. We also have many
						amenities to make your movie-going experience more enjoyable,
						such as comfortable seating, state-of-the-art sound systems, and
						snack bars.
					</p>
					<p style={styles.descriptionText}>
						We hope you enjoy your time at TVG. We are here to make your
						movie-going experience unforgettable.
					</p>
				</div>
			</div>

			{/* Phần about ở phía dưới */}
			<div style={styles.aboutSection}>
				<div style={styles.meetTeamSection}>
					<span style={styles.meetText}>Meet </span>
					<span style={styles.teamText}>The Team</span>
				</div>

				{/* Meet the Team Section */}
				<div className="container-xl">
					<div className="row">
						<div className="col-12">
							<div style={styles.memberContainer}>
								{/* Team Member 1 */}
								<div style={styles.memberCard}>
									<img
										src="/assets/image/abus_Lam.jpg"
										alt="Le Quang Lam"
										style={styles.memberImage}
									/>
									<h6 style={styles.memberName}>
										LE QUANG LAM
									</h6>
									<p style={styles.memberRole}>TEAM LEADER</p>
									<ul style={styles.contactLinks}>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>

								{/* Team Member 2 */}
								<div style={styles.memberCard}>
									<img
										src="/assets/image/abus_Khang.jpg"
										alt="Ngo Nguyen Duy Khang"
										style={styles.memberImage}
									/>
									<h6 style={styles.memberName}>
										NGO NGUYEN DUY KHANG
									</h6>
									<p style={styles.memberRole}>TEAM MEMBER</p>
									<ul style={styles.contactLinks}>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>

								{/* Team Member 3 */}
								<div style={styles.memberCard}>
									<img
										src="/assets/image/abus_Hoang.jpg"
										alt="Le Huy Hoang"
										style={styles.memberImage}
									/>
									<h6 style={styles.memberName}>
										LE HUY HOANG
									</h6>
									<p style={styles.memberRole}>TEAM MEMBER</p>
									<ul style={styles.contactLinks}>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>

								{/* Team Member 4 */}
								<div style={styles.memberCard}>
									<img
										src="/assets/image/abus_My.jpg"
										alt="Pham Thi Diem My"
										style={styles.memberImage}
									/>
									<h6 style={styles.memberName}>
										PHAM THI DIEM MY
									</h6>
									<p style={styles.memberRole}>TEAM MEMBER</p>
									<ul style={styles.contactLinks}>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook-messenger"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fab fa-facebook"
											></Link>
										</li>
										<li style={styles.contactLinkItem}>
											<Link
												to=""
												className="fa fa-phone"
											></Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AboutUs;
