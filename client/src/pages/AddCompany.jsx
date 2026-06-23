import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function AddCompany() {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    package: "",
    location: "",
    minCGPA: "",
    description: "",
    process: "",
    deadline: "",
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
        "https://placement-portal-8sbz.onrender.com/api/company/add",
        formData
      );

      toast.success(res.data.message);

      setFormData({
        companyName: "",
        role: "",
        package: "",
        location: "",
        minCGPA: "",
        description: "",
        process: "",
        deadline: "",
      });
    } catch (error) {
      toast.error("Failed to Add Company");
    }
  };

  return (
    <>
    <Navbar />
    <div className="form-card">
      <h2>Add Company</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="package"
          placeholder="Package"
          value={formData.package}
          onChange={handleChange}
        />
           
           <input
  type="number"
  step="0.1"
  className="form-control mb-3"
  placeholder="Minimum CGPA"
  name="minCGPA"
  value={formData.minCGPA}
  onChange={handleChange}
/>
        <input
          className="form-control mb-3"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
  type="date"
  className="form-control mb-3"
  name="deadline"
  value={formData.deadline}
  onChange={handleChange}
/>

        <textarea
          className="form-control mb-3"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
             
             <textarea
  className="form-control mb-3"
  placeholder="Recruitment Process"
  name="process"
  value={formData.process}
  onChange={handleChange}
/>
        <button
          className="btn btn-primary"
          type="submit"
        >
          Add Company
        </button>
      </form>
    </div>
    </>
  );
}

export default AddCompany;