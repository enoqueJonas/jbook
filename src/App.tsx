import { useState, useEffect, useRef } from "react";
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";

function App() {
  const [input, setInput] = useState('');
  const ref = useRef<any>();
  const iFrameRef = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService();
  }, []);

  const html = 
  `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try{
              eval(event.data);
            }catch(err){
              document.querySelector('#root').innerHTML = '<div style="color: red; "> <h4>Runtime Error</h4>' + err + '</div>';
            }
          }, false)
        </script>
      </body>
    </html>
  `

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
    iFrameRef.current.srcdoc = html;
    // setCode(result.outputFiles[0].text);
    iFrameRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  } 

  return (
    <div className="App">
      <CodeEditor 
        initialValue="const a = 1;"
        handleChange={value => setInput(value)}
      />
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <iframe title="preview" sandbox="allow-scripts" ref={iFrameRef} src="./test.html" srcDoc={html} />
    </div>
  );
}

export default App;
