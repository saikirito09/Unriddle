import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import React from "react";

// Define the custom light theme
const NotebookEditor: React.FC = () => {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: "",
      },
    ],
  });

  // Renders the editor instance.
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="text-2xl font-semibold mb-4">BlockNote Editor:</div>
      <div className="w-full h-full max-w-6xl bg-white p-6 rounded-lg shadow-md overflow-auto">
        <BlockNoteView editor={editor} theme="light" />
      </div>
    </div>
  );
};

export default NotebookEditor;
