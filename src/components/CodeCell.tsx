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
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
      <Resizable direction="horizontal">
        <CodeEditor 
          initialValue="const a = 1;"
          handleChange={value => setInput(value)}
        />
      </Resizable>
      <Preview code={code}/>
    </div>
    </Resizable>
  );
}

export default CodeCell;
