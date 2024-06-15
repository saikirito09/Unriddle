import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingScreen from "@/pages/LandingPage";
import CareersScreen from "@/pages/CareersScreen";
import NewScreen from "@/pages/newScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/careers" element={<CareersScreen />} />
        <Route path="/new" element={<NewScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
