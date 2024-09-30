import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../../contexts/DataContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { Alert } from "react-bootstrap";

// YUP schema
const schema = yup
  .object()
  .shape({
    title: yup.string().required("Title cannot be blank!"),
    content: yup.string().required("Content cannot be blank!"),
    status: yup.boolean().required("Status cannot be blank!"),
    thumbnail: yup
      .mixed()
      .test("fileSize", "File size is too large", (value) => {
        if (!value || !value[0]) return true; // Không có file nào được chọn
        return value[0].size <= 5000000; // Giới hạn 5MB
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value || !value[0]) return true; // Không có file nào được chọn
        return ["image/jpeg", "image/png", "image/gif"].includes(value[0].type);
      }),
  })
  .required();

function BlogEdit() {
  const { id } = useParams();
  const { showAlert, alert } = useContext(DataContext);
  const [blog, setBlog] = useState(null); // Trạng thái chứa dữ liệu blog
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Thêm reset để đặt lại form
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  // Fetch dữ liệu blog từ API khi component được mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/blogs/${id}`);
        console.log(response.data); // Kiểm tra dữ liệu trả về
        setBlog(response.data); // Cập nhật dữ liệu blog
        reset({
          title: response.data.title,
          content: response.data.content,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
        showAlert("danger", "Failed to fetch blog data.");
      }
    };

    fetchBlog();
    AOS.init();
  }, [id, reset, showAlert]);

  // Xử lý khi form được submit
  async function onSubmit(data) {
    const url = `http://localhost:8080/blogs/${id}`;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("status", data.status);
    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("image", data.thumbnail[0]);
    }

    try {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        showAlert("success", "BLOG UPDATED SUCCESSFULLY!");
        navigate(-1);
      }
    } catch (error) {
      console.log("Error updating blog: ", error);
      showAlert(
        "danger",
        "An unexpected error occurred. Please try again later."
      );
    }
  }

  // Xử lý khi nhấn nút hủy
  const handleCancel = () => {
    navigate(-1);
  };

  // Kiểm tra nếu blog chưa được tải
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3" data-aos="fade">
      {alert.type !== "" && (
        <Alert variant={alert.type} dismissible onClose={() => showAlert("", "")}>
          {alert.message}
        </Alert>
      )}
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title")}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className={`form-control ${errors.content ? "is-invalid" : ""}`}
            {...register("content")}
          />
          {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            id="status"
            type="checkbox"
            className={`form-check-input ${errors.status ? "is-invalid" : ""}`}
            {...register("status")}
            defaultChecked={blog?.status} // Hiển thị đúng trạng thái của blog
          />
          {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            id="thumbnail"
            type="file"
            className={`form-control ${errors.thumbnail ? "is-invalid" : ""}`}
            {...register("thumbnail")}
          />
          {errors.thumbnail && <div className="invalid-feedback">{errors.thumbnail.message}</div>}
        </div>

        <div className="d-flex justify-content-start gap-2">
          <button type="submit" className="btn btn-primary" data-aos="zoom-in-right">
            Update Blog
          </button>
          <button type="button" className="btn btn-secondary" data-aos="zoom-in-left" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogEdit;
