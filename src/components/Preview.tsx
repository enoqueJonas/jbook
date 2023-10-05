import "./Preview.css";
import React, { useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
}

const html = `
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
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iFrameRef = useRef<any>();

  useEffect(() => {
    iFrameRef.current.srcdoc = html;
    setTimeout(() => {
      iFrameRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper ">
      <iframe
        title="preview"
        sandbox="allow-scripts"
        ref={iFrameRef}
        src="./test.html"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
