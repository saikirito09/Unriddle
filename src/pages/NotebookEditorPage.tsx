import React, { useEffect, useState, useRef, useCallback } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { schema } from "prosemirror-schema-basic";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { history, undo, redo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { Input } from "@/components/ui/input";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SettingsPanel from "../components/SettingsPanel";
import DialogBox from "../components/DialogBox";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import FloatingToolbar from "@/components/FloatingToolbar";

// Function to validate UUID format
const isValidUUID = (uuid: string) => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

// Function to save data to localStorage
const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to load data from localStorage
const loadFromLocalStorage = (key: string) => {
  const storageString = localStorage.getItem(key);
  return storageString ? JSON.parse(storageString) : null;
};

export default function NotebookEditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<null | string>(null);
  const [title, setTitle] = useState("Title");
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { notebookId } = useParams<{ notebookId: string }>();
  const viewRef = useRef<EditorView | null>(null);
  const [editorState, setEditorState] = useState<EditorState | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      } else if (!notebookId || !isValidUUID(notebookId)) {
        navigate("/new");
      }
    }
  }, [user, loading, notebookId, navigate]);

  useEffect(() => {
    // Clear local storage when the component mounts
    localStorage.clear();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const debouncedSaveTitle = useCallback(
    debounce((newTitle: string) => {
      saveToLocalStorage("title", newTitle);
    }, 500),
    [],
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSaveTitle(newTitle);
  };

  useEffect(() => {
    if (editorContainerRef.current) {
      const state = EditorState.create({
        schema,
        plugins: [
          history(),
          keymap(baseKeymap),
          keymap({ "Mod-z": undo, "Mod-y": redo }),
        ],
      });

      const view = new EditorView(editorContainerRef.current, {
        state,
        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);
          setEditorState(newState);
          const markdown = defaultMarkdownSerializer.serialize(newState.doc);
          saveToLocalStorage("editorContent", markdown);
        },
      });

      viewRef.current = view;
      setEditorState(state);

      return () => {
        if (viewRef.current) {
          viewRef.current.destroy();
          viewRef.current = null;
        }
      };
    }
  }, []);

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (viewRef.current) {
        viewRef.current.focus();
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Navbar
        toggleSidebar={toggleSidebar}
        toggleSettings={toggleSettings}
        setDialogType={setDialogType}
        title={title}
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
          } ${isSettingsOpen ? "mr-64" : ""} flex flex-col items-center w-full h-full`}
        >
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            className="text-5xl mb-4 w-[48%] text-left border-none p-0 outline-none shadow-none"
          />
          <div
            id="editor"
            ref={editorContainerRef}
            className="w-full h-full max-w-6xl bg-white p-6 rounded-lg overflow-auto flex-grow relative"
          ></div>
          {editorState && viewRef.current && (
            <FloatingToolbar editorView={viewRef.current} state={editorState} />
          )}
        </div>
      </div>
      <SettingsPanel isSettingsOpen={isSettingsOpen} />
      <DialogBox dialogType={dialogType} setDialogType={setDialogType} />
    </div>
  );
}
