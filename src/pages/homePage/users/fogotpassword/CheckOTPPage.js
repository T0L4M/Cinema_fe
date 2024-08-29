import React, { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../../contexts/DataContext";

//YUP
const schema = yup
	.object()
	.shape({
		code: yup.number().required("CODE"),
	})
	.required();

function CheckOTPPage(props) {
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
		const url = "http://localhost:8080/accounts/forgot";

		const method = "POST";
		await axios({
			method,
			url,
			data,
		})
			.then((res) => {
				if (res.status === 200) {
					showAlert("success", "SEND YOUR PASSWORD SUCCESSFULLY!");
					navigate("/login");
				}
			})
			.catch((error) => console.log("Error API ", method, ": ", error));
	}

	return (
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-xl-10 col-lg-12 col-md-9">
					<div class="card o-hidden border-0 shadow-lg my-5">
						<div class="card-body p-0">
							<div class="row">
								<div class="col-lg-6 d-none d-lg-block bg-password-image">
									<img src="" alt="img" width="75%" />
								</div>
								<div class="col-lg-6">
									<div class="p-5">
										<div class="text-center">
											<h1 class="h4 text-gray-900 mb-2">
												Enter OTP code
											</h1>
											<p class="mb-4 text-dark">
												We get it, stuff happens.
												Just enter your email
												address below and we'll send
												you a link to reset your
												password!
											</p>
										</div>
										<form onSubmit={handleSubmit(onSubmit)}>
											<div class="form-group">
												<input
													type="text"
													class="form-control form-control-user"
													id="code"
													placeholder="Enter OTP"
													{...register("code")}
												/>
											</div>
											<button
												type="submit"
												class="btn btn-primary btn-user btn-block mt-3"
											>
												Confirm OTP
											</button>
										</form>
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

export default CheckOTPPage;
