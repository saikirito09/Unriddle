import React, { useEffect, useRef } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { toggleMark, setBlockType } from "prosemirror-commands";
import { Schema } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import OrderedMap from "orderedmap";

// Define marks and nodes for floating toolbar commands
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

interface FloatingToolbarProps {
  editorView: EditorView;
  state: EditorState;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  editorView,
  state,
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const applyCommand = (command: any) => {
    command(editorView.state, editorView.dispatch, editorView);
    editorView.focus();
  };

  useEffect(() => {
    const updateToolbarPosition = () => {
      const { from, to } = state.selection;
      if (from === to) {
        if (toolbarRef.current) {
          toolbarRef.current.style.display = "none";
        }
        return;
      }

      if (toolbarRef.current) {
        toolbarRef.current.style.display = "block";
        const start = editorView.coordsAtPos(from);
        const end = editorView.coordsAtPos(to);
        const box = toolbarRef.current.getBoundingClientRect();

        toolbarRef.current.style.left = `${(start.left + end.left) / 2 - box.width / 2}px`;
        toolbarRef.current.style.top = `${start.top - box.height - 5}px`;
      }
    };

    updateToolbarPosition();
    window.addEventListener("resize", updateToolbarPosition);

    return () => {
      window.removeEventListener("resize", updateToolbarPosition);
    };
  }, [state, editorView]);

  return (
    <div
      ref={toolbarRef}
      className="floating-toolbar absolute bg-white border border-gray-300 rounded shadow-md p-2 z-10"
    >
      <button
        onClick={() => applyCommand(toggleMark(mySchema.marks.bold))}
        className="px-2 py-1 m-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
      >
        Bold
      </button>
      <button
        onClick={() => applyCommand(toggleMark(mySchema.marks.italic))}
        className="px-2 py-1 m-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
      >
        Italic
      </button>
      <button
        onClick={() =>
          applyCommand(setBlockType(mySchema.nodes.heading, { level: 1 }))
        }
        className="px-2 py-1 m-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
      >
        H1
      </button>
      <button
        onClick={() =>
          applyCommand(setBlockType(mySchema.nodes.heading, { level: 2 }))
        }
        className="px-2 py-1 m-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
      >
        H2
      </button>
      <button
        onClick={() =>
          applyCommand(setBlockType(mySchema.nodes.heading, { level: 3 }))
        }
        className="px-2 py-1 m-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
      >
        H3
      </button>
    </div>
  );
};

export default FloatingToolbar;
