import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "./TextEditor.css";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("# Header");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        event.target &&
        ref.current &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  const handleClick = () => {
    setEditing(true);
  };

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor value={value} onChange={(val) => setValue(val || "")} />
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="text-editor">
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default TextEditor;
