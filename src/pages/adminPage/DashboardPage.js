import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DashboardPage(props) {
	const [paymentData, setPaymentData] = useState([]);
	const [productData, setProductData] = useState([]);
	const [movieData, setMovieData] = useState([]);
	//Payment Chart
	const fetchPaymentChart = async () => {
		const response = await axios.get("http://localhost:8080/payments/chart");
		setPaymentData(response.data.data);
	};
	const labels = paymentData.map((item) => item[0]);
	const amounts = paymentData.map((item) => item[1]);
	//Product Chart
	const fetchProductChart = async () => {
		const response = await axios.get("http://localhost:8080/order_details/chart");
		setProductData(response.data.data);
	};
	const names = productData.map((item) => item[0]);
	const quantities = productData.map((item) => item[1]);
	//Movie Chart
	const fetchMovieChart = async () => {
		const response = await axios.get("http://localhost:8080/bookings/chart");
		setMovieData(response.data.data);
	};
	const seats = movieData.map((item) => item[0]);
	const titles = movieData.map((item) => item[1]);
	useEffect(() => {
		fetchPaymentChart();
		fetchProductChart();
		fetchMovieChart();
	}, []);
	return (
		<div class="container mt-3">
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-4 text-center">
					<h1>Payment Chart</h1>
					<Line
						id="paymentChart"
						data={{
							labels: labels,
							datasets: [
								{
									label: "Amount",
									data: amounts,
									backgroundColor: "rgba(255, 99, 132, 0.6)",
									borderColor: "rgba(255, 99, 132, 1)",
									borderWidth: 1,
								},
							],
						}}
						options={{
							responsive: true,
							scales: {
								y: {
									beginAtZero: true,
									precision: 0,
								},
							},
						}}
					/>

					<h1 className="mt-3">Product Chart</h1>
					<Pie
						id="productChart"
						data={{
							labels: names,
							datasets: [
								{
									label: "Products Sold",
									data: quantities,
									backgroundColor: [
										"#fd7f6f",
										"#7eb0d5",
										"#b2e061",
										"#bd7ebe",
										"#ffb55a",
										"#ffee65",
										"#beb9db",
										"#fdcce5",
										"#8bd3c7",
										"#54bebe",
										"#76c8c8",
										"#98d1d1",
										"#badbdb",
										"#dedad2",
										"#e4bcad",
										"#df979e",
										"#d7658b",
										"#c80064",
									],
									hoverOffset: 4,
								},
							],
						}}
						options={{
							responsive: true,
							plugins: {
								legend: {
									position: "bottom",
									labels: {
										usePointStyle: true,
									},
								},
							},
						}}
					/>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-8 text-center">
					<h1>Top Movie Chart</h1>
					<Bar
						id="topMovieChart"
						data={{
							labels: titles,
							datasets: [
								{
									label: "Amount",
									data: seats,
									backgroundColor: [
										"rgba(255, 99, 132, 0.2)",
										"rgba(75, 192, 192, 0.2)",
										"rgba(255, 159, 64, 0.2)",
										"rgba(54, 162, 235, 0.2)",
										"rgba(153, 102, 255, 0.2)",
										"rgba(201, 203, 207, 0.2)",
									],
									borderColor: [
										"rgb(255, 99, 132)",
										"rgb(75, 192, 192)",
										"rgb(255, 159, 64)",
										"rgb(54, 162, 235)",
										"rgb(153, 102, 255)",
										"rgb(201, 203, 207)",
									],
									borderWidth: 1,
								},
							],
						}}
						options={{
							indexAxis: "y",
							responsive: true,
							scales: {
								y: {
									beginAtZero: true,
									precision: 0,
								},
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default DashboardPage;
