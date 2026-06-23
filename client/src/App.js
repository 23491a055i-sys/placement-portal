import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Companies from "./pages/Companies";
import MyApplications from "./pages/MyApplications";
import AdminApplications from "./pages/AdminApplications";
import Profile from "./pages/Profile";
import AddCompany from "./pages/AddCompany";
import Students from "./pages/Students";
import CompanyApplicants from "./pages/CompanyApplicants";
import AddAnnouncement from "./pages/AddAnnouncement";
import Announcements from "./pages/Announcements";

function App() {
  return (
    <BrowserRouter>
     <ToastContainer
    position="top-right"
    autoClose={3000}
  />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/companies"
  element={
    <ProtectedRoute>
      <Companies />
    </ProtectedRoute>
  }
/>

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin-applications"
  element={
    <ProtectedRoute>
      <AdminApplications />
    </ProtectedRoute>
  }
/>

      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
     <Route
  path="/add-company"
  element={<AddCompany />}
/>
     <Route
  path="/students"
  element={<Students />}
/>
   <Route
  path="/company-applicants/:companyId"
  element={<CompanyApplicants />}
/>
<Route
  path="/add-announcement"
  element={<AddAnnouncement />}
/>

<Route
  path="/announcements"
  element={<Announcements />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;