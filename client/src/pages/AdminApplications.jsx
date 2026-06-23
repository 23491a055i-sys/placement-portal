import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "https://placement-portal-8sbz.onrender.com/api/application/all"
      );
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status,
    interviewDate = "",
    interviewTime = ""
  ) => {
    try {
      await axios.put(
        `https://placement-portal-8sbz.onrender.com/api/application/status/${id}`,
        {
          status,
          interviewDate,
          interviewTime,
        }
      );

      toast.success(`Application ${status}`);
      fetchApplications();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">

        <h2 className="admin-title">
          All Applications
        </h2>

        <div className="application-grid">

          {applications.map((app) => (
            <div
              key={app._id}
              className="application-card-admin"
            >

              <h3>
                {app.companyId?.companyName || "Company Deleted"}
              </h3>

              <p>
                <b>Student:</b>{" "}
                {app.studentId?.name || "Unknown"}
              </p>

              <p>
                <b>Status:</b> {app.status}
              </p>

              <p>
                Applied On:{" "}
                {new Date(app.createdAt).toLocaleString()}
              </p>

              {/* Resume */}
              {app.studentId?.resume && (
                <a
                  href={`https://placement-portal-8sbz.onrender.com/uploads/${app.studentId.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-view-resume"
                >
                  View Resume
                </a>
              )}

              {/* ACTION BUTTONS */}
              <div className="action-buttons">

                <button
                  className="btn-select"
                  onClick={() =>
                    updateStatus(app._id, "Selected")
                  }
                >
                  Select
                </button>

                <button
                  className="btn-reject"
                  onClick={() =>
                    updateStatus(app._id, "Rejected")
                  }
                >
                  Reject
                </button>

                <button
                  className="btn-schedule"
                  onClick={() => {
                    const date = prompt("Interview Date (DD-MM-YYYY)");
                    const time = prompt("Interview Time");

                    updateStatus(
                      app._id,
                      "Shortlisted",
                      date,
                      time
                    );
                  }}
                >
                  Schedule
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default AdminApplications;