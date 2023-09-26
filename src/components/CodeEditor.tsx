import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return <MonacoEditor 
    options={{
      wordWrap: 'on'
    }} 
    theme="vs-dark" 
    language="javascript" 
    height="500px"
  />;
}

export default CodeEditor;