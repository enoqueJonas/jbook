import { useState  } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundler from "../bundler";

function CodeCell() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const handleClick = async () => {
    const output = await bundler(input)
    setCode(output);
  } 

  return (
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
  );
}

export default CodeCell;
