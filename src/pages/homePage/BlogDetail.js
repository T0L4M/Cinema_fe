import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const styles = {
	blogDetail: {
		maxWidth: "1200px",
		margin: "40px auto",
		padding: "40px",
		fontFamily: "Arial, sans-serif",
		backgroundColor: "#1a1a1a",
		color: "#e0e0e0",
		borderRadius: "15px",
		boxShadow: "0 0 20px rgba(0,0,0,0.2)",
	},
	header: {
		textAlign: "center",
		marginBottom: "40px",
	},
	title: {
		fontSize: "3.5rem",
		color: "#ffffff",
		marginBottom: "20px",
		textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
	},
	date: {
		fontSize: "1.1rem",
		color: "#b0b0b0",
		marginBottom: "30px",
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		margin: "30px 0",
	},
	image: {
		maxWidth: "100%",
		maxHeight: "500px",
		objectFit: "contain",
		borderRadius: "10px",
	},
	content: {
		lineHeight: 1.8,
		color: "#cccccc",
		padding: "30px",
		backgroundColor: "#2a2a2a",
		borderRadius: "10px",
		fontSize: "1.1rem",
	},
	tags: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		marginTop: "30px",
	},
	tag: {
		backgroundColor: "#3a3a3a",
		color: "#ffffff",
		padding: "8px 15px",
		margin: "8px",
		borderRadius: "20px",
		fontSize: "1rem",
	},
};

function BlogDetail() {
	const { id } = useParams();
	const [post, setPost] = useState({});

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/blogs/detail/${id}`
				);
				setPost(response.data.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchPost();
	}, [id]);

	// Hàm để chia nội dung thành hai phần
	const splitContent = (content) => {
		if (!content) return ["", ""];
		const middleIndex = Math.floor(content.length / 2);
		const closestParagraphEnd = content.indexOf("</p>", middleIndex);
		if (closestParagraphEnd === -1) return [content, ""];
		return [
			content.slice(0, closestParagraphEnd + 4),
			content.slice(closestParagraphEnd + 4),
		];
	};

	const [firstHalf, secondHalf] = splitContent(post.content);

	return (
		<div style={styles.blogDetail}>
			<div style={styles.header}>
				<h1 style={styles.title}>{post.title}</h1>
				<p style={styles.date}>
					Ngày đăng: {new Date(post.created_at).toLocaleDateString()}
				</p>
			</div>
			<div style={styles.content} dangerouslySetInnerHTML={{ __html: firstHalf }} />
			{post.image && (
				<div style={styles.imageContainer}>
					<img src={post.image} alt={post.title} style={styles.image} />
				</div>
			)}
			<div style={styles.content} dangerouslySetInnerHTML={{ __html: secondHalf }} />
			<div style={styles.tags}>
				{post.tags &&
					post.tags.map((tag, index) => (
						<span key={index} style={styles.tag}>
							{tag}
						</span>
					))}
			</div>
		</div>
	);
}

export default BlogDetail;
