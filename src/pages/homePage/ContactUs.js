import React from "react";

function ContactUs(props) {
	return (
		<div className="pt-4 pb-4">
			<div className="container-xl">
				<div className="row contact_1 bg_dark pt-5 pb-5 rounded-4">
					<div className="col-md-3">
						<div className="contact_1i row">
							<div className="col-md-2 col-2">
								<div className="contact_1il">
									<span className="col_red fs-3">
										<i class="fa-solid fa-location-dot"></i>
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
										<i class="fa-solid fa-clock"></i>
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
										<i class="fa-solid fa-envelope"></i>
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
										<i class="fa-solid fa-phone"></i>
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

				<div className="row contact_2 mt-4">
					<div className="col-md-12">
						<div className="contact_2l row">
							<div className="col-md-12" style={{ color: "red" }}>
								<h4>FEEDBACK</h4>
							</div>
						</div>
						<form action="/feedback/store" method="post">
							<div className="contact_2l1 mt-3 row">
								<div className="col-md-4">
									<div className="contact_2l1i">
										<input
											className="form-control"
											placeholder="Full Name (*)"
											type="text"
											name="username"
										/>
										{/* Add client-side validation here */}
									</div>
								</div>
								<div className="col-md-4">
									<div className="contact_2l1i">
										<input
											className="form-control"
											placeholder="Email (*)"
											type="text"
											name="email"
										/>
										{/* Add client-side validation here */}
									</div>
								</div>
								<div className="col-md-4">
									<div className="contact_2l1i">
										<input
											className="form-control"
											placeholder="Phone (*)"
											type="text"
											name="phone"
										/>
										{/* Add client-side validation here */}
									</div>
								</div>
							</div>
							<div className="col-md-12 my-3">
								<div className="contact_2l1i">
									<textarea
										placeholder="Comment"
										className="form-control form_text"
										name="comment"
										style={{ resize: "none" }}
									></textarea>
									{/* Add client-side validation here */}
								</div>
							</div>
							<h6 className="mt-3 mb-0">
								<input
									className="button"
									type="submit"
									value="Submit"
								/>
							</h6>
						</form>
					</div>
				</div>

				<div className="row contact_3 mt-4">
					<div className="col-md-12">
						<div className="map-container">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.267979060374!2d106.67926757480507!3d10.790775789358879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4a8afdb7b%3A0x2e46c4ada94947dd!2zMzkxQSDEkC4gTmFtIEvhu7MgS2jhu59pIE5naMSpYSwgUGjGsOG7nW5nIDE0LCBRdeG6rW4gMywgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1724763500959!5m2!1svi!2s"
								width="100%"
								height="450"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Google Maps Location"
								className="rounded-4"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
