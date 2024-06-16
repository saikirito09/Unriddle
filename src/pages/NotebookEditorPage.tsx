import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SettingsPanel from "../components/SettingsPanel";
import DialogBox from "../components/DialogBox";
import { useAuth } from "@/context/AuthContext";

// Function to validate UUID format
const isValidUUID = (uuid: string) => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

const NotebookEditorPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"signUp" | "logIn" | null>(null);
  const { user, loading } = useAuth(); // Assuming `useAuth` provides a loading state
  const navigate = useNavigate();
  const { notebookId } = useParams<{ notebookId: string }>();

  // Check if the user is logged in and the notebook ID is valid once the authentication state is loaded
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      } else if (!notebookId || !isValidUUID(notebookId)) {
        navigate("/new");
      }
    }
  }, [user, loading, notebookId, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Create a new editor instance
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: "",
      },
    ],
  });

  // Show a loading indicator while the authentication state is being determined
  if (loading) {
    return <div>Loading...</div>;
  }

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
          isLoggedIn={!!user}
        />
        <div
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : ""
          } ${isSettingsOpen ? "mr-64" : ""} flex flex-col items-center justify-center w-full h-full`}
        >
          <div className="w-full h-full max-w-6xl bg-white p-6 rounded-lg overflow-auto">
            <BlockNoteView editor={editor} theme="light" />
          </div>
        </div>
      </div>
      <SettingsPanel isSettingsOpen={isSettingsOpen} />
      <DialogBox dialogType={dialogType} setDialogType={setDialogType} />
    </div>
  );
};

export default NotebookEditorPage;
