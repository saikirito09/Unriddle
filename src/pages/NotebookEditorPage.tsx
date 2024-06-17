import React, { useEffect, useState, useRef, useCallback } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import {
  defaultMarkdownSerializer,
  MarkdownSerializer,
} from "prosemirror-markdown";
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
import OrderedMap from "orderedmap";

// Extend the basic schema to include bold, italic, and headers
const nodes = OrderedMap.from(basicSchema.spec.nodes).update("heading", {
  attrs: { level: { default: 1 } },
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [
    { tag: "h1", attrs: { level: 1 } },
    { tag: "h2", attrs: { level: 2 } },
    { tag: "h3", attrs: { level: 3 } },
  ],
  toDOM(node) {
    return ["h" + node.attrs.level, 0];
  },
});

const marks = OrderedMap.from(basicSchema.spec.marks)
  .addToEnd("bold", {
    parseDOM: [
      { tag: "strong" },
      {
        tag: "b",
        getAttrs: (node) => node.style.fontWeight !== "normal" && null,
      },
    ],
    toDOM: () => ["strong", 0],
  })
  .addToEnd("italic", {
    parseDOM: [
      { tag: "em" },
      {
        tag: "i",
        getAttrs: (node) => node.style.fontStyle !== "normal" && null,
      },
    ],
    toDOM: () => ["em", 0],
  });

const mySchema = new Schema({ nodes, marks });

// Custom Markdown serializer
const customMarkdownSerializer = new MarkdownSerializer(
  {
    ...defaultMarkdownSerializer.nodes,
  },
  {
    ...defaultMarkdownSerializer.marks,
    bold: {
      open: "**",
      close: "**",
      mixable: true,
      expelEnclosingWhitespace: true,
    },
    italic: {
      open: "*",
      close: "*",
      mixable: true,
      expelEnclosingWhitespace: true,
    },
  },
);

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
  const [title, setTitle] = useState("");
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
        schema: mySchema,
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
          const markdown = customMarkdownSerializer.serialize(newState.doc);
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
            placeholder="Give it a title"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            className="text-5xl mb-4 w-[48%] text-left p-0 shadow-none"
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
          />
          <div
            id="editor"
            ref={editorContainerRef}
            className="w-[48%] h-full bg-white py-3 rounded-lg overflow-auto flex-grow relative prosemirror-editor"
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
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
