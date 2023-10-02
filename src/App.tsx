import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

function App() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService();
  }, []);

  const handleClick = async () => {
    if(!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    setCode(result.outputFiles[0].text);
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

export default App;
