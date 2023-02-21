import { Box } from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const BlogEditor = ({ content, setContent }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ size: [] }],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      ["link"],
      ["video"],
      ["clean"],
    ],
  };

  const formats = [
    "code-block",
    "direction",
    "header",
    "font",
    "script",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "color",
    "background",
  ];
  return (
    <Box zIndex={1} w="100%">
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
        style={{ width: "100%" }}
      />
    </Box>
  );
};

export default BlogEditor;
