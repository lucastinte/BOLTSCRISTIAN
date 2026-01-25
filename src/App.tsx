import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import AdminUploadPage from "./pages/AdminUploadPage";
import AdminSignupPage from "./pages/AdminSignupPage";
import AdminRoute from "./components/AdminRoute";
import { GymSection } from "./components/GymSection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminUploadPage />
            </AdminRoute>
          }
        />
        <Route path="/admin-signup" element={<AdminSignupPage />} />
        <Route
          path="/black-training"
          element={
            <div className="min-h-screen bg-black text-white flex flex-col justify-center">
              <GymSection showLogo={true} />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
