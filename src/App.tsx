import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { GymSection } from "./components/GymSection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/black-training"
          element={
            <div className="min-h-screen bg-black text-white flex flex-col justify-center">
              <GymSection />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
