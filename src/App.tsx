import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingScreen from "@/pages/LandingPage";
import CareersScreen from "@/pages/CareersScreen";
import NewScreen from "@/pages/NewScreen";
import ImportScreen from "@/pages/ImportScreen";
import UpgradeScreen from "@/pages/UpgradeScreen";
import NotebookEditorPage from "@/pages/NotebookEditorPage"; // Import the NotebookEditorPage component
import { AuthProvider } from "@/context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/careers" element={<CareersScreen />} />
          <Route path="/new" element={<NewScreen />} />
          <Route path="/import" element={<ImportScreen />} />
          <Route path="/upgrade" element={<UpgradeScreen />} />
          <Route path="/b/:notebookId" element={<NotebookEditorPage />} />{" "}
          {/* Add this line */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
