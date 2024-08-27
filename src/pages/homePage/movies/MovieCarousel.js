import React, { useEffect } from "react";
import $ from "jquery";
import "../assets/vendor/owlcarousel/assets/owl.carousel.min.css";
import "../assets/vendor/owlcarousel/assets/owl.theme.default.min.css";

function MovieCarousel(props) {
	useEffect(() => {
		$(".owl-carousel").owlCarousel({
			loop: false,
			margin: 10,
			nav: true,
			// dots:true,
			responsive: {
				0: {
					items: 2,
				},
				600: {
					items: 3,
				},
				1000: {
					items: 5,
				},
			},
			navText: [
				'<i class="fa fa-chevron-left"></i>',
				'<i class="fa fa-chevron-right"></i>',
			],
		});
	}, []);
	return <div></div>;
}

export default MovieCarousel;
