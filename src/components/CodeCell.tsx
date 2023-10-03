import { useState  } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundler from "../bundler";
import Resizable from "./Resizable";

function CodeCell() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const handleClick = async () => {
    const output = await bundler(input)
    setCode(output);
  } 

  return (
    <Resizable direction="vertical">
      <div className="App">
      <CodeEditor 
        initialValue="const a = 1;"
        handleChange={value => setInput(value)}
      />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <Preview code={code}/>
    </div>
    </Resizable>
  );
}

export default CodeCell;
