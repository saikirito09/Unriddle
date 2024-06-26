import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SettingsPanel from "../components/SettingsPanel";
import DialogBox from "../components/DialogBox";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const ImportScreen: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"signUp" | "logIn" | null>(null);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleButtonClick = () => {
    if (!user) {
      setDialogType("logIn");
    } else {
      // Handle the action here if the user is logged in
    }
  };

  return (
    <div className="flex h-screen">
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
          isLoggedIn={!!user} // Pass the user state as a boolean
        />
        <div
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : ""
          } ${isSettingsOpen ? "mr-64" : ""} flex flex-col items-center justify-center w-full h-full`}
        >
          <div className="w-full h-full border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center rounded-xl">
            <Upload className="h-12 w-12 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Import a file</h2>
            <p className="text-gray-500 mb-4">PDF or Markdown</p>
            <Button
              className="mb-2 px-16 rounded-xl transform transition-transform duration-200 hover:scale-[1.03]"
              onClick={handleButtonClick}
            >
              Select files
            </Button>
            <Button
              variant="secondary"
              className="mb-2 px-16 rounded-xl transform transition-transform duration-200 hover:scale-[1.03]"
              onClick={handleButtonClick}
            >
              Paste URL
            </Button>
            <Button
              variant="secondary"
              className="px-16 rounded-xl transform transition-transform duration-200 hover:scale-[1.03]"
              onClick={handleButtonClick}
            >
              Paste text
            </Button>
          </div>
        </div>
      </div>
      <SettingsPanel isSettingsOpen={isSettingsOpen} />
      <DialogBox dialogType={dialogType} setDialogType={setDialogType} />
    </div>
  );
};

export default ImportScreen;
