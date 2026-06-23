import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "https://placement-portal-8sbz.onrender.com/api/user/all-students"
      );

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    (
      (student.name || "") +
      " " +
      (student.branch || "") +
      " " +
      (student.college || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="students-page">

        <h2 className="students-title">
          All Students
        </h2>

        <div className="students-title-line"></div>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by Name, Branch or College..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="students-table-wrapper">

          <table className="students-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>College</th>
                <th>CGPA</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (

                <tr key={student._id}>

                  <td>
                    <div className="student-name">

                      <div className="student-avatar">
                        {(student.name || "S")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span>{student.name || "-"}</span>

                    </div>
                  </td>

                  <td>{student.email || "-"}</td>

                  <td>{student.branch || "-"}</td>

                  <td>{student.college || "-"}</td>

                  <td>{student.cgpa || "-"}</td>

                  <td>
                    {student.resume ? (
                      <span className="resume-yes">
                        Available
                      </span>
                    ) : (
                      <span className="resume-no">
                        No Resume
                      </span>
                    )}
                  </td>

                  <td>

                    {student.resume ? (
                      <div className="action-buttons-student">

                        <a
                          href={`https://placement-portal-8sbz.onrender.com/uploads/${student.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-view"
                        >
                          👁 View
                        </a>

                        <a
                          href={`https://placement-portal-8sbz.onrender.com/uploads/${student.resume}`}
                          download
                          className="btn-download"
                        >
                          ⬇ Download
                        </a>

                      </div>
                    ) : (
                      "-"
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Students;