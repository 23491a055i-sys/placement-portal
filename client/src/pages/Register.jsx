import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Register clicked");
    console.log(formData);

    try {
      const res = await axios.post(
        "https://placement-portal-8sbz.onrender.com/api/auth/register",
        formData
      );

      console.log(res.data);

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
  <div className="auth-page">

    <div className="auth-card">

      <h2 className="auth-title">
        Register
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="auth-btn"
        >
          Register
        </button>

        <p className="text-center mt-3">
          <span style={{ color: "white" }}>
            Already have an account?
          </span>{" "}
          <Link
            to="/"
            className="auth-link"
          >
            Login
          </Link>
        </p>

      </form>

    </div>

  </div>
);
}

export default Register;