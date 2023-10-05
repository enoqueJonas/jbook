import "./Preview.css";
import React, { useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          document.querySelector('#root').innerHTML = '<div style="color: red; "> <h4>Runtime Error</h4>' + err + '</div>';
        }

        window.addEventListener('error', (event) => {
          handleError(event.error);
        })

        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          }catch(err){
            handleError(err);
          }
        }, false)
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
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
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
