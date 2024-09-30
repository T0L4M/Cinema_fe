import { yupResolver } from "@hookform/resolvers/yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    status: yup.boolean().required("Status cannot be blank!"),
    thumbnail: yup
      .mixed()
      .test("thumbnail", "You need to provide a file", (value) => {
        if (value.length > 0) {
          return true;
        }
        return false;
      }),
  })
  .required();

function BlogCreate() {
  const { showAlert, alert } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  //
  function useCKEditor(name) {
    const [editorData, setEditorData] = useState("");
    const { register } = useForm();

    useEffect(() => {
      register(name, { value: editorData });
      // console.log(editorData);
    }, [editorData, register, name]);

    const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setEditorData(data);
    };

    return { editorData, handleEditorChange };
  }

  const { editorData, handleEditorChange } = useCKEditor("content");
  //

  // onSubmit function
  async function onSubmit(data) {
      data.content = editorData;
    const url = "http://localhost:8080/blogs";
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append(
      "image",
      data.thumbnail[0] == null ? "" : data.thumbnail[0]
    );

    await axios
      .post(url, formData)
      .then((res) => {
        if (res.status == 200) {
          showAlert("success", "CREATE MOVIE SUCCESSFULLY!");
          navigate(-1);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container mt-3" data-aos="fade">
      {alert.type !== "" && (
        <Alert variant={alert.type} dismissible transition>
          {alert.message}
        </Alert>
      )}
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title")}
          />
          <span className="text-danger">{errors.title?.message}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label" style={{ color: "black" }}>
            Content<span className="text-danger">*</span>
          </label>
          <CKEditor
            editor={ClassicEditor}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={handleEditorChange} // Utilize the custom hook handler
          />

          <span className="text-danger">{errors.content?.message}</span>
        </div>

        <div className="mb-3">
          <span>
            Status<span className="text-danger">*</span>
          </span>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="statusOn"
              {...register("status")}
              value={true}
            />
            <label className="form-check-label" htmlFor="statusOn">
              ON
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="statusOff"
              {...register("status")}
              value={false}
            />
            <label className="form-check-label" htmlFor="statusOff">
              OFF
            </label>
          </div>
          <span className="text-danger">{errors.status?.message}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            // accept="image/*"
            {...register("thumbnail")}
          />
          <span className="text-danger">{errors.thumbnail?.message}</span>
        </div>

        <div className="d-flex justify-content-start gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            data-aos="zoom-in-right"
          >
            Create Blog
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-aos="zoom-in-left"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogCreate;
