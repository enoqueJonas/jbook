import './Resizable.css';
import React from "react";
import { ResizableBox } from "react-resizable";

interface ResizableProp {
  direction: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProp> = ({ direction, children }) => {
  return(
    <ResizableBox height={300} width={300} resizeHandles={['s']}>
      <div>
        {children}
      </div>
    </ResizableBox>
  );
}

export default Resizable;