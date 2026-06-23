import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await axios.get(
      `https://placement-portal-8sbz.onrender.com/api/application/student/${user.id}`
    );

    setApplications(res.data);
  };

  const withdrawApplication =
  async (id) => {
    try {
      await axios.delete(
        `https://placement-portal-8sbz.onrender.com/api/application/withdraw/${id}`
      );

      toast.success(
        "Application Withdrawn"
      );

      fetchApplications();
    } catch (error) {
      toast.error(
        "Withdraw Failed"
      );
    }
  };
 return (
  <>
  <Navbar />
  <div className="application-card">
    <h2>My Applications</h2>

    {applications.map((app) => (
      <div key={app._id}>
        <h3>
          {app.companyId?.companyName ||
            "Company Deleted"}
        </h3>

        <p>
          Role: {app.companyId?.role || "N/A"}
        </p>

        <p>
          Package: {app.companyId?.package || "N/A"}
        </p>
         
         <p>
  Applied On:{" "}
  {new Date(
    app.createdAt
  ).toLocaleDateString()}
</p>
       <p>Status: {app.status}</p>

       {app.interviewDate && (
  <p>
    Interview Date:
    {app.interviewDate}
  </p>
)}

{app.interviewTime && (
  <p>
    Interview Time:
    {app.interviewTime}
  </p>
)}

{app.status === "Pending" && (
  <button
    className="application-card"
    onClick={() => withdrawApplication(app._id)}
  >
    Withdraw Application
  </button>
)}

<hr />
      </div>
    ))}
  </div>
  </>
);
}

export default MyApplications;