import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import prettier from 'prettier/standalone';
import parser from 'prettier/plugins/babel';

interface CodeEditorProps {
  initialValue: string;
  handleChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ handleChange, initialValue }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  
  const onEditorMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    // You can access the editor instance and Monaco instance here
    editor.onDidChangeModelContent(() => {
      handleChange(editor.getValue());
    })

    editor.getModel()?.updateOptions({ tabSize: 2 });
    editorRef.current = editor;
  }

  const onFormatClick = async () => {
    const unformatted: string = editorRef.current?.getModel()?.getValue() ?? '';
  
    try {
      const formatted = await prettier.format(unformatted, {
        parser: 'babel',
        plugins: [parser], // Include the Babel plugin
        useTabs: false,
        semi: true,
        singleQuote: true,
      });
  
      editorRef.current?.setValue(formatted);
    } catch (error) {
      console.error("Error formatting code:", error);
    }
  };
  

  return (
    <div>
      <button onClick={onFormatClick} > Format </button>
      <MonacoEditor
      onMount={onEditorMount}
      value={initialValue}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        lineNumbersMinChars: 3,
        folding: false,
        fontSize: 16,
        scrollBeyondLastLine: false,
      }}
      theme="vs-dark"
      language="javascript"
      height="500px"
    />
    </div>
  );
}


export default CodeEditor;