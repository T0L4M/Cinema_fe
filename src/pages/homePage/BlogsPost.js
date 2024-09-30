import React, { useState, useEffect } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const styles = {
	blogsContainer: {
		width: "100%",
		padding: "40px 20px",
		backgroundColor: "#1a1a1a",
		color: "#e0e0e0",
	},
	innerContainer: {
		maxWidth: "1400px",
		margin: "0 auto",
	},
	blogsTitle: {
		color: "#ffffff",
		fontSize: "2.5rem", // Reduced from 3.5rem
		marginBottom: "40px",
		textAlign: "center",
		textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
	},
	blogItem: {
		marginBottom: "40px",
		backgroundColor: "#2a2a2a",
		borderRadius: "15px",
		overflow: "hidden",
		boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
		transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
	},
	blogImage: {
		width: "100%",
		height: "300px",
		objectFit: "cover",
		borderTopLeftRadius: "15px",
		borderBottomLeftRadius: "15px",
	},
	blogContent: {
		padding: "30px",
		textAlign: "left",
		transition: "color 0.3s ease-in-out",
	},
	blogTitle: {
		fontSize: "2.2rem",
		marginBottom: "20px",
		color: "#ffffff",
		fontWeight: "bold",
		textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
		transition: "color 0.3s ease-in-out", // Add this line
	},
	blogExcerpt: {
		fontSize: "1.1rem",
		color: "#cccccc",
		lineHeight: "1.8",
		marginBottom: "20px",
	},
	likeViewContainer: {
		display: "flex",
		alignItems: "center",
		marginTop: "20px",
		justifyContent: "space-between",
	},
	likeButton: {
		display: "flex",
		alignItems: "center",
		fontSize: "1rem",
		color: "#b0b0b0",
		cursor: "pointer",
	},
	viewCount: {
		display: "flex",
		alignItems: "center",
		fontSize: "1rem",
		color: "#b0b0b0",
	},
	icon: {
		marginRight: "10px",
		color: "#4FC0D0",
		fontSize: "1.2rem",
	},
	pagination: {
		justifyContent: "center",
		marginTop: "30px",
	},
};

function BlogsPost() {
	const [posts, setPosts] = useState([]);
	//PAGINATE
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 5;
	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(posts.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(posts.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, posts]);
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % posts.length;
		setItemOffset(newOffset);
	};
	//END PAGINATE

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get("http://localhost:8080/blogs/on");
				setPosts(response.data.data);
			} catch (error) {
				console.error("Error fetching blog posts:", error);
			}
		};

		fetchPosts();
	}, []);

	console.log("blogs:", posts);

	return (
		<div style={styles.blogsContainer}>
			<div style={styles.innerContainer}>
				<h1 style={styles.blogsTitle}>BLOG ĐIỆN ẢNH</h1>
				{posts.length == 0 && (
					<ColorRing
						visible={true}
						height="80"
						width="80"
						ariaLabel="blocks-loading"
						wrapperStyle={{ display: "block", margin: "auto" }}
						wrapperClass="blocks-wrapper"
						colors={["#213363", "#1B6B93", "#4FC0D0", "#FF9EAA"]}
					/>
				)}
				{posts.length > 0 &&
					currentItems.map((post, index) => (
						<Row key={index} style={styles.blogItem}>
							<Col xs={12} md={4}>
								<Link to={`/blogs/${post.id}`}>
									<img
										src={`http://localhost:8080/uploads/blogs/${post.thumbnail}`}
										alt={post.title}
										style={styles.blogImage}
									/>
								</Link>
							</Col>
							<Col xs={12} md={8}>
								<div
									style={styles.blogContent}
									onMouseEnter={(e) => {
										e.currentTarget.style.color = "#e0e0e0";
										e.currentTarget.querySelector(
											"h2"
										).style.color = "red";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.color = "#e0e0e0";
										e.currentTarget.querySelector(
											"h2"
										).style.color = "#ffffff";
									}}
								>
									<Link
										to={`/blogs/${post.id}`}
										style={{ textDecoration: "none" }}
									>
										<h2 style={styles.blogTitle}>
											{post.title}
										</h2>
									</Link>
									<p style={styles.blogExcerpt}>
										{post.excerpt}
									</p>
								</div>
							</Col>
						</Row>
					))}
				<ReactPaginate
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					marginPagesDisplayed={2}
					pageCount={pageCount}
					previousLabel="< previous"
					containerClassName="pagination justify-content-center"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					activeClassName="active"
					previousClassName="page-item"
					nextClassName="page-item"
					previousLinkClassName="page-link"
					nextLinkClassName="page-link"
					disabledClassName="disabled"
					style={styles.pagination}
				/>
			</div>
		</div>
	);
}

export default BlogsPost;
