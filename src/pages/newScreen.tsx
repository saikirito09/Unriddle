import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import DialogBox from "../components/DialogBox";
import SettingsPanel from "../components/SettingsPanel";

const NewScreen: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"signUp" | "logIn" | null>(null);
  const [view, setView] = useState<"default" | "import">("default");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleImportClick = () => {
    setView("import");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar
        toggleSidebar={toggleSidebar}
        toggleSettings={toggleSettings}
        setDialogType={setDialogType}
      />
      <div className="flex flex-1 mt-14">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleImportClick={handleImportClick}
        />
        <MainContent
          isSidebarOpen={isSidebarOpen}
          isSettingsOpen={isSettingsOpen}
          view={view}
        />
      </div>
      <SettingsPanel isSettingsOpen={isSettingsOpen} />
      <DialogBox dialogType={dialogType} setDialogType={setDialogType} />
    </div>
  );
};

export default NewScreen;
