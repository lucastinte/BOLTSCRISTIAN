import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { GymSection } from "./components/GymSection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
