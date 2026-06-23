import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    try {
      const res = await axios.post(
        "https://placement-portal-8sbz.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);
       toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

 return (
  <div className="auth-page">

    <div className="auth-card">

      <h2 className="auth-title">
        Login
      </h2>

      <form onSubmit={handleSubmit}>

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
          Login
        </button>

        <p className="text-center mt-3">
          <span style={{ color: "white" }}>
            Don't have an account?
          </span>{" "}
          <Link
            to="/register"
            className="auth-link"
          >
            Register
          </Link>
        </p>

      </form>

    </div>

  </div>
);
}

export default Login;