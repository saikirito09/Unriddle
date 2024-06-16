import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useParams } from "react-router-dom";

const NotebookEditor: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();

  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  return (
    <div className="flex-1 p-6">
      <BlockNoteView editor={editor} />
    </div>
  );
};

export default NotebookEditor;
