// import "@/titptap.scss";
// src/Tiptap.jsx
"use client";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Undelineextention from "@tiptap/extension-underline";
import MenuBar from "./MenuBar";

// define your extension array
const extensions = [StarterKit, Undelineextention];

const Tiptap = ({
  content,
  onchange,
}: {
  content: string;
  onchange: (data: string) => void;
}) => {
  return (
    <div className="border w-full">
      <EditorProvider
        editorProps={{
          attributes: {
            class:
              "w-full prose prose-sm sm:prose lg:prose-lg focus:outline-none pt-2",
          },
        }}
        onUpdate={(props) => {
          onchange(props.editor.getHTML());
        }}
        editable={true}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </div>
  );
};

export default Tiptap;
