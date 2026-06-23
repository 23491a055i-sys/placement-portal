import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function AddAnnouncement() {
  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const submitHandler =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          "https://placement-portal-8sbz.onrender.com/api/announcement/add",
          {
            title,
            description,
          }
        );

        toast.success(
          "Announcement Added"
        );

        setTitle("");
        setDescription("");
      } catch (error) {
        toast.error("Failed");
      }
    };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>
          Add Announcement
        </h2>

        <form
          onSubmit={
            submitHandler
          }
        >
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-primary"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAnnouncement;