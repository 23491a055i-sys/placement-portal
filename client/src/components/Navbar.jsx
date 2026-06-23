import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">
      <Link
        to="/dashboard"
        className="navbar-brand fw-bold"
      >
        🚀 Placement Portal
      </Link>

      <div className="ms-auto d-flex flex-wrap gap-2">

        <Link
          to="/dashboard"
          className="nav-btn nav-purple"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/companies"
          className="nav-btn nav-blue"
        >
          🏢 Companies
        </Link>

        {role === "student" && (
          <>
            <Link
              to="/my-applications"
              className="nav-btn nav-green"
            >
              📄 Applications
            </Link>

            <Link
              to="/profile"
              className="nav-btn nav-orange"
            >
              👤 Profile
            </Link>

            <Link
              to="/announcements"
              className="nav-btn nav-pink"
            >
              📢 News
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link
              to="/students"
              className="nav-btn nav-green"
            >
              👨‍🎓 Students
            </Link>

            <Link
              to="/add-company"
              className="nav-btn nav-orange"
            >
              ➕ Add Company
            </Link>

            <Link
              to="/admin-applications"
              className="nav-btn nav-blue"
            >
              📋 Applications
            </Link>

            <Link
              to="/add-announcement"
              className="nav-btn nav-pink"
            >
              📢 Announcement
            </Link>
          </>
        )}

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;