import { useEffect, useState, useRef, useCallback } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import { history, undo, redo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import debounce from "lodash/debounce";
import OrderedMap from "orderedmap";
import { saveUserData, loadUserData } from "@/utils/firestore";
import { useAuth } from "@/context/AuthContext";

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

export const mySchema = new Schema({ nodes, marks });

// Function to validate UUID format
export const isValidUUID = (uuid: string) => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

export const useNotebookLogic = (user, notebookId, navigate) => {
  const [title, setTitle] = useState("");
  const viewRef = useRef<EditorView | null>(null);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const debouncedSaveTitle = useCallback(
    debounce((newTitle: string) => {
      if (user) {
        saveUserData(user.uid, { title: newTitle });
      }
    }, 500),
    [user],
  );

  const debouncedSaveContent = useCallback(
    debounce((newContent: any) => {
      if (user) {
        saveUserData(user.uid, { editorContent: newContent });
      }
    }, 2000),
    [user],
  );

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
    const loadData = async () => {
      if (user) {
        const userData = await loadUserData(user.uid);
        if (userData) {
          setTitle(userData.title);
          const content = userData.editorContent;
          const state = EditorState.create({
            schema: mySchema,
            plugins: [
              history(),
              keymap(baseKeymap),
              keymap({ "Mod-z": undo, "Mod-y": redo }),
            ],
            doc: mySchema.nodeFromJSON(content),
          });
          setEditorState(state);

          if (viewRef.current) {
            viewRef.current.updateState(state);
          }
        }
      }
    };

    loadData();
  }, [user]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSaveTitle(newTitle);
  };

  const initEditorView = (editorContainerRef) => {
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
          const content = newState.doc.toJSON();
          debouncedSaveContent(content);
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
  };

  return {
    title,
    setTitle,
    viewRef,
    editorState,
    handleTitleChange,
    initEditorView,
  };
};
