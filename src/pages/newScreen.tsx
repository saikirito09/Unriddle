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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your actual login state logic

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
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
          setDialogType={setDialogType}
          isLoggedIn={isLoggedIn}
        />
        <MainContent
          isSidebarOpen={isSidebarOpen}
          isSettingsOpen={isSettingsOpen}
          setDialogType={setDialogType}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <SettingsPanel isSettingsOpen={isSettingsOpen} />
      <DialogBox dialogType={dialogType} setDialogType={setDialogType} />
    </div>
  );
};

export default NewScreen;
