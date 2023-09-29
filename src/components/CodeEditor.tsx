import MonacoEditor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  initialValue: string;
  handleChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ handleChange, initialValue }) => {
  const onEditorMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    // You can access the editor instance and Monaco instance here
    console.log(editor.getValue());
  }

  return (
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
  );
}


export default CodeEditor;